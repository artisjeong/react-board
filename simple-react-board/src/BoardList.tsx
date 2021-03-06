import { useState, useEffect } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

const Board = ({ props }: { props: any }) => {
    return (
        <tr
            onClick={() => {
                props.handleClickList(props.BOARD_ID);
            }}
        >
            <td>
                <input
                    type="checkbox"
                    value={props.BOARD_ID}
                    onChange={props.onCheckboxChange}
                    checked={props.checkList.includes(String(props.BOARD_ID))}
                ></input>
            </td>
            <td>{props.BOARD_ID}</td>
            <td>{props.BOARD_TITLE}</td>
            <td>{props.REGISTER_ID}</td>
            <td>{props.REGISTER_DATE}</td>
        </tr>
    );
};

/**
 * @param {SS} props
 * @return {SS} Component
 */
function BoardList(props: any) {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([] as Array<string>);
    const [checkList, setCheckList] = useState([] as Array<string>);

    useEffect(() => {
        if (!props.state.isComplete) {
            getList();
        }
    });

    const getList = () => {
        Axios.get("http://localhost:8000/list", {})
            .then((res) => {
                const { data } = res;
                setBoardList(data);
                setCheckList([]);

                props.setState({
                    ...props.state,
                    isComplete: true,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleClickList = (boardId: string) => {
        const checkSet = new Set(checkList);

        if (checkSet.has(String(boardId))) {
            checkSet.delete(String(boardId));
        } else {
            checkSet.add(String(boardId));
        }

        setCheckList([...checkSet]);
    };

    /**
     * @param {SS} e
     */
    const onCheckboxChange = (e: any) => {
        const checkSet = new Set(checkList);

        if (e.target.checked) {
            checkSet.add(e.target.value);
        } else {
            checkSet.delete(e.target.value);
        }

        setCheckList([...checkSet]);
    };

    const handleDelete = () => {
        if (checkList.length == 0) {
            alert("????????? ???????????? ???????????????.");
            return;
        }

        Axios.post("http://localhost:8000/delete", {
            boardIdList: checkList,
        })
            .then(() => {
                getList();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const onClickWrite = () => {
        props.setState({
            isModifyMode: false,
            isComplete: true,
            boardId: 0,
        });
    };

    const onClickModify = () => {
        if (checkList.length == 0) {
            alert("????????? ???????????? ???????????????.");
            return;
        } else if (checkList.length > 1) {
            alert("????????? ???????????? ???????????????.");
            return;
        }

        props.setState({
            isModifyMode: true,
            isComplete: true,
            boardId: checkList[0],
        });

        navigate("/write");
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>??????</th>
                        <th>??????</th>
                        <th>??????</th>
                        <th>?????????</th>
                        <th>?????????</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((v: any) => {
                        Object.assign(v, {
                            onCheckboxChange: onCheckboxChange,
                            handleClickList: handleClickList,
                            checkList: checkList,
                        });
                        return <Board props={v} key={v.BOARD_ID} />;
                    })}
                </tbody>
            </Table>
            <Link to="/write">
                <Button variant="info" onClick={onClickWrite}>
                    ?????????
                </Button>
            </Link>
            <Button variant="secondary" onClick={onClickModify}>
                ????????????
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                ????????????
            </Button>
        </div>
    );
}

export default BoardList;
