import BoardList from "BoardList";
import Write from "Write";
import Login from "Login";
import { Routes, Route } from "react-router-dom";

/**
 *
 * @param {SS} props
 * @return {SS}
 */
function MyRouter(props: any) {
    return (
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/list" element={<BoardList state={props.state} setState={props.setState}></BoardList>}></Route>
            <Route path="/write" element={<Write state={props.state} setState={props.setState}></Write>}></Route>
        </Routes>
    );
}

export default MyRouter;
