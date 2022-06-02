import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Context } from "../../App";
import UserService from "../../services/UserService";

const Users = () => {
  const { store } = useContext(Context);

  const getSelected = () => {
    const selected = store.users.filter((item) => {
      return item.selected;
    });
    return selected.map((item) => item.id);
  };

  const selectAll = () => {
    const users = store.users.map((item) => {
      return { ...item, selected: true };
    });
    store.setUsers(users);
  };

  const unselectAll = () => {
    const users = store.users.map((item) => {
      return { ...item, selected: false };
    });
    store.setUsers(users);
  };

  const toggleSelect = (id) => {
    return () => {
      const users = store.users.map((item) => {
        if (item.id === id) {
          return { ...item, selected: item.selected ? false : true };
        } else {
          return item;
        }
      });
      store.setUsers(users);
    };
  };

  const onLogout = () => {
    store.logout();
  };

  const unblockUsers = async () => {
    const selected = getSelected();
    await UserService.unblockUsers(selected);
    store.getUsers();
  };

  const blockUsers = async () => {
    const selected = getSelected();
    await UserService.blockUsers(selected);
    if (-1 !== selected.indexOf(store.user.id)) {
      alert("You blocked yourself:)")
      await store.logout();
    } else {
      store.getUsers();
    }
  };

  const removeUsers = async () => {
    const selected = getSelected();
    await UserService.removeUsers(selected);
    if (-1 !== selected.indexOf(store.user.id)) {
      alert("You removed yourself:)")
      await store.logout();
    } else {
      store.getUsers();
    }
  };

  useEffect(() => {
    store.getUsers();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="justify-content-between">
        <Col>
          <h2>Welcome {store.user.login}</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={onLogout}>Log out</Button>
        </Col>
      </Row>

      <div className="d-flex justify-content-between">
        <ButtonGroup className="mt-5">
          <Button variant="warning" onClick={blockUsers}>
            Block
          </Button>
          <Button variant="info" onClick={unblockUsers}>
            Unblock
          </Button>
          <Button variant="danger" onClick={removeUsers}>
            Remove
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mt-5">
          <Button variant="primary" onClick={selectAll}>
            Select All
          </Button>{" "}
          <Button variant="secondary" onClick={unselectAll}>
            Unselected All
          </Button>
        </ButtonGroup>
      </div>

      <Row className="mt-3">
        <Col xl="2" className="border p-2">
          ID
        </Col>
        <Col xl="8" className="border p-2">
          Login
        </Col>
        <Col xl="1" className="d-flex justify-content-center border p-2">
          Blocked
        </Col>
        <Col xl="1" className="d-flex justify-content-center border p-2">
          Select
        </Col>
      </Row>

      {store.users?.map(({ id, login, blocked, selected }) => {
        return (
          <Row key={id}>
            <Col xl="2" className="border p-2">
              {id}
            </Col>
            <Col xl="8" className="border p-2">
              {login}
            </Col>
            <Col xl="1" className="d-flex justify-content-center border p-2">
              <Form.Check type="checkbox" disabled checked={blocked} />
            </Col>
            <Col xl="1" className="d-flex justify-content-center border p-2">
              <Form.Check
                type="checkbox"
                onChange={toggleSelect(id)}
                checked={selected ? true : false}
              />
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default observer(Users);
