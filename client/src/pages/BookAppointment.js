import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";
import Layout from '../components/Layout'

function BookAppointment() {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [doctor, setDoctor] = useState(null);
    const dispatch = useDispatch();
    const [date, setDate] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const [timeTaken, setTimeTaken] = useState();
    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "/api/doctor/get-doctor-info-by-id",
                {
                    doctorId: params.doctorId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctor(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const bookNow = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "/api/user/book-appointment",
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctor,
                    userInfo: user,
                    date: date,
                    time: timeTaken
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error('Error booking appointment')
            dispatch(hideLoading());
        }
    }

    const checkAvailability = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "/api/user/check-booking-avilability",
                {
                    doctorId: params.doctorId,
                    date: date,
                    time: timeTaken,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                setIsAvailable(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error booking appointment");
            dispatch(hideLoading());
        }
    };
    useEffect(() => {
        getDoctorData();
    }, []);
    return (
        <Layout>
            {doctor && (
                <div>
                    <h1 className="page-title">
                        {doctor.firstName} {doctor.lastName}
                    </h1>
                    <hr />
                    <Row>
                        <Col span={12} sm={24} xs={24} lg={8}>
                            <h1 className="normal-text"><b>Working Hour: {doctor.timings[0]} - {doctor.timings[1]}</b></h1>
                            <div className="d-flex flex-column pt-2">
                                <DatePicker
                                    format={'MM-DD-YYYY'}
                                    onChange={(v)=>{
                                        setDate(moment(v).format('MM-DD-YYYY'));
                                        setIsAvailable(false);
                                    }}/>
                                <TimePicker format='HH:mm' className="mt-3" onChange={(values)=>{
                                    setIsAvailable(false);
                                    setTimeTaken(
                                        moment(values).format('HH:mm')
                                    )
                                }}/>
                                {!isAvailable &&
                                    <Button className="primary-button mt-2 full-width-button"
                                            onClick={checkAvailability}>Check Availability</Button>
                                }
                                {isAvailable &&
                                    <Button className="primary-button mt-2 full-width-button"
                                            onClick={bookNow}>Book Now</Button> }
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </Layout>
    )
}

export default BookAppointment