import {useState} from "react";
import Loading from "./assets/Loading";
import leftBg from "./assets/images/bg-left.svg";
import rightBg from "./assets/images/bg-right.svg";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {auth} from './firebase';
import {RecaptchaVerifier,signInWithPhoneNumber  } from "firebase/auth";

const Login = () => {
    const [msg, setMsg] = useState({show: false, msg: "", type: "error"});
    const [loading, setLoading] = useState(false);
    const [mynumber, setnumber] = useState("");
    const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
    const [optBtn, setOptBtn] = useState(false);


    // Sent OTP
    const signin = (e) => {
        e.preventDefault();

        if (mynumber === "") {
            setMsg({show: true, msg: "Please enter your number", type: "error"});
            return;
        }
        console.log(mynumber);
        setLoading(true);
        window.recaptchaVerifier = new RecaptchaVerifier('otp-btn', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                ValidateOtp();
            }
        }, auth);
        const verify=window.recaptchaVerifier;
        signInWithPhoneNumber(auth,mynumber, verify)
            .then((result) => {
                window.confirmationResult = result;
                setfinal(result);
                setOptBtn(true);
                setMsg({show: true, msg: "OTP sent", type: "success"})
                setLoading(false);
                setshow(true);
            })
            .catch((err) => {
                setLoading(false);
                setMsg({show: true, msg: "Error while sending OTP, Please try again later.", type: "error"})
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            });
    }

    // Validate OTP
    const ValidateOtp = (e) => {
        e.preventDefault();
        if (otp === null || final === null) {
            setMsg({show: true, msg: "Please enter your OTP", type: "error"})
            return;
        }
        setLoading(true);
        final.confirm(otp).then((result) => {
            setMsg({show: true, msg: "OTP verified, redirecting to home page", type: "success"})
            setLoading(false);
            setOptBtn(false);
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);

        }).catch((err) => {
            setLoading(false);
            setMsg({show: true, msg: "Error while verifying OTP, please try again later.", type: "error"})
            setTimeout(() => {
                window.location.reload();
            }, 5000);

        })
    }


    return (
        <>
            <section className="overflow-visible max-w-[400px] mx-auto">
                <form

                    className="flex mt-40 flex-col space-y-5 text-center bg-[#ffffff] rounded-[3px] py-[25px] px-[40px] shadow-[0_0_10px_rgba(0,0,0,0.15)]">
                    <h1 className="-mb-3 text-[#5E6C84]">Log in to continue to:</h1>
                    <h1 className="mb-2 text-[#5E6C84] font-bold">Trello</h1>
                    <PhoneInput
                        disabled={optBtn}
                        onFocus={() => setMsg({show: false})}
                        value={mynumber} onChange={setnumber}
                        name="phoneNumber"
                        className="text-[14px] bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded-[3px] max-w-[400px] p-[0.5em] focus:bg-[#ffffff] focus:border-[#4C9AFF] focus:shadow-[0_0_0] focus:outline-0"
                        type="text" placeholder="Enter phone number" required

                    />
                    <div id="recaptcha-container"></div>
                    <button
                        id="otp-btn"
                        onClick={e=>{signin(e)}}
                        disabled={optBtn}
                        className="disabled:cursor-not-allowed disabled:bg-[#091e420a] disabled:text-[#a5adba] bg-[#0052cc] text-[#ffffff] font-bold hover:bg-[#0065ff] py-[0.6em] px-[1.3em] rounded-[0.3em]">
                        Send OTP
                    </button>
                    <div style={{display: show ? "block" : "none"}}>
                        <input
                            onFocus={() => setMsg({show: false})}
                            className="text-[14px] bg-[#FAFBFC] border-2 border-[#DFE1E6] rounded-[3px] max-w-[400px] p-[0.5em] focus:bg-[#ffffff] focus:border-[#4C9AFF] focus:shadow-[0_0_0] focus:outline-0"
                            type="text" placeholder={"Enter your OTP"}
                            onChange={(e) => {
                                setotp(e.target.value)
                            }}></input>
                        <button
                            onClick={e=>{ValidateOtp(e)}}
                            className="bg-[#0052cc] text-[#ffffff] font-bold hover:bg-[#0065ff] py-[0.6em] px-[1.3em] rounded-[0.3em]">
                            Sign in
                        </button>
                    </div>
                    {msg.show &&
                        <p className={`text-[14px] ${msg.type === "success" ? "green" : "red"} !mt-0`}>{msg.msg}</p>}
                </form>
                {loading && <Loading/>}
            </section>
            <div className="z-[-900] h-full w-full fixed top-0 left-0 overflow-hidden">
                <img className="fixed h-[400px] w-[400px] bottom-0 left-0 z-[-999] max-w-[30%]" src={leftBg}
                     alt="leftBg"/>
                <img className="fixed h-[400px] w-[400px] bottom-0 right-0 z-[-999] max-w-[30%]" src={rightBg}
                     alt="rightBg"/>
            </div>
        </>
    );
}
export default Login;



