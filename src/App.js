import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import _ from 'lodash';
import './style.css';
export default function App() {
  const [posts, setPosts] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let postSize = 5;
  
  const pageCount = posts ? Math.ceil(posts.length / postSize) : 0;
  // console.log("pageCount",pageCount)
  if (pageCount === 1) return null;
  // const pages = _.range(1, pageCount + 1);
  // console.log('pages', pages);
  useEffect(
    () => async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const data = await res.data;
      // console.log(data);
      setPosts(data);
      setPaginated(_(res.data).slice(0).take(postSize).value());
    },
    []
  );

  // console.log(paginated);

  // let curr = 2;
  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // pages.map((item)=>{ <Pagination.Item key={item}>{item} </Pagination.Item>})
  const paginate = (pageNo) => {
    console.log(pageNo);
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * postSize;

    console.log('start index', startIndex);
    console.log('postSizr index', postSize);

    const paginatePost = _(posts).slice(startIndex).take(postSize).value();
    setPaginated(paginatePost);
  };
  return (
    <>
      <Container className="my-5">
        <Row>
          <Col sm={12}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  {/* <th>Last Name</th>
          <th>Username</th> */}
                </tr>
              </thead>
              <tbody>
                {paginated &&
                  paginated.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>
                        <p
                          className={
                            item.completed
                              ? 'btn btn-success'
                              : 'btn btn-danger'
                          }
                        >
                          {item.completed ? 'completed' : 'pending'}{' '}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Pagination className="d-flex justify-content-center" size="sm">
          {items}
        </Pagination>
      </Container>
    </>
  );
}
