import { useState, useEffect } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

/**
 *
 * @param {any} props
 * @return {SS} Component
 */
function Write(props: any) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
    });
    const [isRendered, setRendered] = useState(false);

    const { title, content } = inputs;

    useEffect(() => {
        if (props.state.boardId != 0 && !isRendered) {
            getDetail();
        }
    });

    const write = () => {
        Axios.post("http://localhost:8000/insert", {
            title: title,
            content: content,
        })
            .then(() => {
                props.setState({
                    isModifyMode: false,
                    isComplete: false,
                    boardId: 0,
                });
                navigate("/list", { replace: true });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const update = () => {
        Axios.post("http://localhost:8000/update", {
            title: title,
            content: content,
            id: props.state.boardId,
        })
            .then(() => {
                props.setState({
                    isModifyMode: false,
                    isComplete: false,
                    boardId: 0,
                });
                navigate("/list", { replace: true });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const getDetail = () => {
        Axios.post("http://localhost:8000/detail", {
            id: props.state.boardId,
        })
            .then((res) => {
                const { data } = res;
                setInputs({
                    title: data[0].BOARD_TITLE,
                    content: data[0].BOARD_CONTENT,
                });
                setRendered(true);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        const nextInputs = {
            ...inputs,
            [name]: value,
        };
        setInputs(nextInputs);
    };

    const handleCancel = () => {
        props.setState({
            isModifyMode: false,
            isComplete: false,
            boardId: 0,
        });
    };

    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>제목</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        placeholder="제목을 입력하세요"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>내용</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        value={content}
                        onChange={handleChange}
                        placeholder="내용을 입력하세요"
                    />
                </Form.Group>
            </Form>
            <Button variant="info" onClick={props.state.isModifyMode ? update : write}>
                작성완료
            </Button>
            <Link to="/list">
                <Button variant="secondary" onClick={handleCancel}>
                    취소
                </Button>
            </Link>
        </div>
    );
}

export default Write;
