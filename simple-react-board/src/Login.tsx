import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

/**
 *
 * @return {SS}
 */
function Login() {
    const navigate = useNavigate();
    const [logInfo, setLogInfo] = useState({
        id: "",
        pw: "",
    });
    const [isSaveId, setIsSaveId] = useState(false);
    const [failInfo, setIsFailed] = useState({
        isFailed: false,
        message: "",
    });

    const handleInput = (e: any) => {
        const { name, value } = e.target;

        setLogInfo({
            ...logInfo,
            [name]: value,
        });
    };

    const handleSaveId = (e: any) => {
        setIsSaveId(e.target.checked);
    };

    const handleLogin = () => {
        if (!logInfo.id) {
            setIsFailed({
                isFailed: true,
                message: "아이디를 입력하세요.",
            });

            setTimeout(() => {
                setIsFailed({
                    isFailed: false,
                    message: "",
                });
            }, 1000);
            return;
        }

        if (!logInfo.pw) {
            setIsFailed({
                isFailed: true,
                message: "비밀번호를 입력하세요.",
            });

            setTimeout(() => {
                setIsFailed({
                    isFailed: false,
                    message: "",
                });
            }, 1000);
            return;
        }

        Axios.post("http://localhost:8000/login", {
            id: logInfo.id,
            pw: logInfo.pw,
        })
            .then((res) => {
                if (!res.data || res.data.length == 0) {
                    setIsFailed({
                        isFailed: true,
                        message: "사용자 정보가 없습니다.",
                    });

                    setTimeout(() => {
                        setIsFailed({
                            isFailed: false,
                            message: "",
                        });
                    }, 1000);
                } else {
                    navigate("/list");
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <>
            <span className="log_tit">로그인</span>
            <span className="tit_id">아이디</span>
            <input
                type="text"
                className="inp_id"
                name="id"
                placeholder="아이디를 입력하세요."
                onChange={handleInput}
                value={logInfo.id}
            ></input>
            <span className="tit_pw">아이디</span>
            <input
                type="password"
                className="inp_pw"
                name="pw"
                placeholder="비밀번호를 입력하세요."
                onChange={handleInput}
                value={logInfo.pw}
            ></input>
            <input type="checkbox" className="chk_save" checked={isSaveId} onChange={handleSaveId}></input>
            <span className="tit_chk_id">아이디저장</span>
            <button className="btn_login" onClick={handleLogin}>
                로그인
            </button>
            <Alert key="danger" variant="danger" show={failInfo.isFailed}>
                {failInfo.message}
            </Alert>
        </>
    );
}

export default Login;
