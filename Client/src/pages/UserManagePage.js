import ProjectTables from "../components/ProjectTable";
import {
  Row,
  Col,
  Table,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import { useState, useEffect } from "react";
import user1 from "../assets/images/users/user1.jpg";
import user2 from "../assets/images/users/user2.jpg";
import user3 from "../assets/images/users/user3.jpg";
import axios from "axios";
import Button from "react-bootstrap/Button";

const UserManagePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {}, []); // 백엔드에 유저 정보들 axios로 요청해야함

  const tableData = [
    {
      avatar: user1,
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Flexy React",
      status: "pending",
      weeks: "35",
      budget: "95K",
    },
    {
      avatar: user2,
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Lading pro React",
      status: "done",
      weeks: "35",
      budget: "95K",
    },
    {
      avatar: user3,
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Elite React",
      status: "holt",
      weeks: "35",
      budget: "95K",
    },
  ];

  return (
    <Row>
      <Col lg="12">
        <div>
          <Card>
            <CardBody>
              <CardTitle tag="h5">User List</CardTitle>

              <Table
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <img
                            src={tdata.avatar}
                            className="rounded-circle"
                            alt="avatar"
                            width="45"
                            height="45"
                          />
                          <div className="ms-3">
                            <h6 className="mb-0">{tdata.name}</h6>
                            <span className="text-muted">{tdata.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* 여기에 수정 / 삭제 버튼 추가 */}
                      <td>
                        <Button variant="outline-success">수정</Button>{" "}
                        <Button variant="outline-danger">삭제</Button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default UserManagePage;
