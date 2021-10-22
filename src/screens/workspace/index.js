import {
  Layout,
  Row,
  Col,
  Card,
  Avatar,
  Button,
  List,
  Skeleton,
  Switch,
  Modal,
  Form,
  Input,
  Popconfirm,
} from "antd";
import { useEffect, useState, useContext } from "react";
import {
  EditOutlined,
  PlusOutlined,
  CopyOutlined,
  ShareAltOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { getData, _alert, getUser, putData } from "../../api";
import { AuthContext } from "../../App";
import { useHistory, useLocation, useParams } from "react-router";
const { Header } = Layout;
const { Meta } = Card;

const Workspace = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState({});
  const [requiredMark, setRequiredMarkType] = useState(true);
  const [initLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [userLinks, setUserLinks] = useState({});

  const { logout } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const showModal = (isEdit = false, _prevState = {}) => {
    if (isEdit) {
      setState(_prevState);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setState({});
  };
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleInputChange = (e, field) => {
    let previosState = { ...state };
    previosState[field] = e.target.value;
    setState(previosState);
  };
  const submit = async () => {
    let isValid = true;
    [
      { key: "link", label: "Link" },
      { key: "name", label: "Name" },
    ].forEach((field) => {
      if (!state[field.key]) {
        _alert(`${field.key} is required`, "error");
        isValid = false;
        return;
      }
    });
    if (!isValid) return;
    setLoading(true);
    let payload = {
      ...userLinks,
      UserId: user.userId,
    };
    payload[state.name] = state.link;
    console.log(payload);
    await putData("/Test/user", payload);
    setLoading(false);
    handleCancel();
    _alert("Created Successfully", "success");
    fetchAllLinks();
  };
  const fetchAllLinks = async (userId = null) => {
    let _user = null;
    if (!userId) {
      _user = getUser();
      if (!_user) {
        logout();
        history.push("/login");
        return;
      }
    }
    userId = userId ?? _user.userId;
    console.log({ userId });
    setUser(_user);
    let response = await getData("/Test/user");
    setInitialLoading(false);
    if (response && response.data && response.data.Items) {
      let _userLinks = response?.data?.Items.find(
        (item) => item.UserId === userId ?? _user.userId
      );
      if (!_userLinks) return;
      setUserLinks(_userLinks);
      let keys = Object.keys(_userLinks);
      keys = keys.filter((key) => key !== "UserId");
      let _list = keys.map((key) => ({
        name: key,
        loading: false,
        description: `${key} link`,
        link: _userLinks[key],
      }));
      setList(_list);
    }
  };
  const checkUser = () => {
    if (id) fetchAllLinks(id.toString());
    else fetchAllLinks();
  };
  useEffect(() => {
    checkUser();
  }, []);

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      _alert("Copied!", "success");
    } catch (err) {
      _alert("Failed to copy!", "error");
    }
  };
  const confirm = (e) => {
    logout();
    history.push("/login");
  };

  const cancel = (e) => {
    console.log(e);
  };
  return (
    <Layout>
      {/* Navbar in Workspace */}
      {/* <Header className="header">
        <div className="circle" />

        <Popconfirm
          title="Are you sure to logout?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          {!id && <Button type="default" icon={<LogoutOutlined />} />}
        </Popconfirm>
      </Header> */}
      <Row>
        {!id && (
          <Col className="full-height center" span={12}>
            <Card
              title="Links"
              extra={
                !id ? (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                  />
                ) : null
              }
              bordered={false}
              style={{ width: "90%" }}
            >
              <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                  <List.Item actions={!id ? [<Switch defaultChecked />] : null}>
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        title={
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.name}
                          </a>
                        }
                        description={item.link}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        )}
        <Col className="full-height center" span={!id ? 12 : 24}>
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
            style={{ width: "90%" }}
            extra={
              !id ? (
                <Button
                  type="primary"
                  onClick={() => {
                    copyToClipBoard(
                      `${window.location.origin}/#${location.pathname}/${user.userId}`
                    );
                  }}
                  icon={<ShareAltOutlined />}
                />
              ) : null
            }
          >
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    !id && (
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                          showModal(true, item);
                        }}
                      />
                    ),
                    <Button
                      type="primary"
                      onClick={() => {
                        copyToClipBoard(item.link);
                      }}
                      icon={<CopyOutlined />}
                    />,
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.name}
                        </a>
                      }
                      description={item.description}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Social link manage"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
            label="Social Platform"
            required
            tooltip="Social platform name"
          >
            <Input
              placeholder="Social platform name"
              onChange={(e) => {
                handleInputChange(e, "name");
              }}
              value={state.name}
            />
          </Form.Item>
          <Form.Item
            className="form-control"
            label="URL"
            required
            tooltip="Social platform link"
          >
            <Input
              placeholder="Social platform url"
              onChange={(e) => {
                handleInputChange(e, "link");
              }}
              value={state.link}
            />
          </Form.Item>

          <Form.Item className="form-control">
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={submit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};
export default Workspace;
