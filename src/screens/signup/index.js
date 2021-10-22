import { Layout, Row, Col, Card, Form, Input, Button, Checkbox } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { signUp as createUser, _alert } from "../../api";
import { useHistory } from "react-router";

// const RegisterScreen = () => {
const Signup = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState(true);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  const history = useHistory();
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  function onChange(e) {
    let previosState = { ...state };
    previosState.termsAgreed = e.target.checked;
    setState(previosState);
  }
  const formControls = [
    {
      field: "email",
      isRequired: true,
      isSecureContext: false,
      placeholder: "Email",
      label: "Email",
    },
    {
      field: "username",
      isRequired: true,
      isSecureContext: false,
      placeholder: "Username",
      label: "Username",
    },
    {
      field: "password",
      isRequired: true,
      isSecureContext: true,
      placeholder: "Password",
      label: "Password",
    },
    {
      field: "confirmPassword",
      isRequired: true,
      isSecureContext: true,
      placeholder: "Confirm Password",
      label: "Confirm Password",
    },
  ];
  const handleInputChange = (e, field) => {
    let previosState = { ...state };
    previosState[field] = e.target.value;
    setState(previosState);
  };
  const signUp = async () => {
    for (const field of formControls) {
      if (field.isRequired && !state[field.field]) {
        _alert(`${field.label} is required`, "error");
        return;
      }
    }
    if (state.password !== state.confirmPassword) {
      _alert("Password not match", "error");
      return;
    }
    if (!state.termsAgreed) {
      _alert("Please agreeing terms and conditions", "error");
      return;
    }

    setLoading(true);
    await createUser(state, { email: state.email }).catch((err) => {
      setLoading(false);
    });
    _alert(
      `We'll send an email to ${state.email} in 5 minutes. Open it up to activate your account.`,
      "success"
    );
    setLoading(false);
    history.push("/login");
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Row>
        <Col className="full-height-2 center" span={24}>
          <Card bordered={false} style={{ width: 400 }}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ requiredMarkValue: requiredMark }}
              onValuesChange={onRequiredTypeChange}
              requiredMark={requiredMark}
            >
              {formControls.map((formControl, index) => (
                <Form.Item
                  className="form-control-2"
                  label={formControl.label}
                  required={formControl.isRequired}
                  tooltip={
                    formControl.isRequired
                      ? "This is a required field"
                      : "This is a optional field"
                  }
                  key={index}
                >
                  {formControl.isSecureContext ? (
                    <Input.Password
                      placeholder={formControl.placeholder}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      size="medium"
                      onChange={(e) => {
                        handleInputChange(e, formControl.field);
                      }}
                    />
                  ) : (
                    <Input
                      placeholder={formControl.placeholder}
                      size="medium"
                      onChange={(e) => {
                        handleInputChange(e, formControl.field);
                      }}
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Checkbox onChange={onChange}>
                  By creating an account you are agreeing to our Terms and
                  Conditions and Privacy Policy.
                </Checkbox>
              </Form.Item>
              <Form.Item className="form-control-2">
                <Button
                  loading={loading}
                  type="primary"
                  size="medium"
                  onClick={signUp}
                >
                  Sign up
                </Button>
                <Button type="link" block href="#/login">
                  Already have an account?
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
export default Signup;
