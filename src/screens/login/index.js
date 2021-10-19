import {
  Layout,
  Row,
  Col,
  Card,
  Avatar,
  Form,
  Input,
  Button,
  Divider
} from "antd";
import { useContext, useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useHistory } from "react-router";
import { signIn, _alert } from "../../api";
import { AuthContext } from "../../App";

const { Header } = Layout;
const { Meta } = Card;

const LoginScreen = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({});
  const [requiredMark, setRequiredMarkType] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleInputChange = (e, field) => {
    let previosState = { ...state };
    previosState[field] = e.target.value;
    setState(previosState);
  };
  const submit = async () => {
    Object.keys(state).forEach((key) => {
      if (!state[key]) {
        _alert(`${key} is required`);
        return;
      }
    });
    setLoading(true);
    let response = await signIn(state);

    setLoading(false);
    if (!response) return;
    let tokens = {
      accessToken: response.signInUserSession?.accessToken?.jwtToken,
      refreshToken: response.signInUserSession?.refreshToken?.token,
      idToken: response.signInUserSession?.idToken?.jwtToken,
      userId: response.attributes?.sub
    };

    login(JSON.stringify(tokens));
    history.push("home");
  };
  useEffect(() => {
    if (localStorage.getItem("token")) history.push("home");
  }, []);
  return (
    <Layout>
      <Header className="header">
        <div className="circle" />
      </Header>
      <Row>
        <Col className="full-height center" span={12}>
          <div className="brand">
            <h1>Flyer</h1>
            <h4>Be discovered with a single link.</h4>
          </div>
        </Col>
        <Col className="full-height center" span={12}>
          <Card
            title={
              <Meta
                className="card-header"
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
              />
            }
            bordered={false}
            style={{ width: 300 }}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ requiredMarkValue: requiredMark }}
              onValuesChange={onRequiredTypeChange}
              requiredMark={requiredMark}
            >
              <Form.Item
                className="form-control"
                label="Username"
                required
                tooltip="This is a required field"
              >
                <Input
                  placeholder="Username"
                  onChange={(e) => {
                    handleInputChange(e, "username");
                  }}
                />
              </Form.Item>
              <Form.Item
                className="form-control"
                required
                label="Password"
                tooltip="This is a required field"
              >
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  size="medium"
                  onChange={(e) => {
                    handleInputChange(e, "password");
                  }}
                />
              </Form.Item>
              <Form.Item className="form-control">
                <Button
                  type="primary"
                  size="large"
                  loading={loading}
                  onClick={submit}
                >
                  Log in
                </Button>
                <Button type="link" block>
                  Forgot Password?
                </Button>
              </Form.Item>
              <Divider dashed className="divider" />
              <Form.Item className="form-control create-new">
                <Button type="primary" size="large" href="#/register">
                  Create New Account
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default LoginScreen;
