import { Typography } from "antd";

const H1 = ({text}) => {
    const { Title } = Typography;
    return (
        <Title>{text}</Title>
    );
}

export default H1;