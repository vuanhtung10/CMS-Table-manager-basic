import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { fetchAllUser } from './services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddnew';
import ModalConfirm from './ModalConfirm';
import _, { debounce } from 'lodash';
import { CSVLink, CSVDownload } from 'react-csv';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import './TableUsers.scss';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPages, settotalPages] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});
    // const [sortBy, setSortBy] = useState('asc');
    // const [sortField, setSortField] = useState('id');
    const [keyword, setkeyword] = useState('');
    const [dataExport, setDataExport] = useState([]);

    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUser(res.total);
            setListUsers(res.data);
            settotalPages(res.total_pages);
        }
    };

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalDelete(false);
    };

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    const handleEditUser = (user) => {
        console.log('user', user);
        setIsShowModalAddNew(true);
        setIsEdit(true);
        setDataUserEdit(user);
    };

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    };

    const handleDeleteUSer = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserForm = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);

        setListUsers(cloneListUsers);
    };

    const handleSort = (sortBy, sortField) => {
        // setSortBy(sortBy);
        // setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
        console.log(cloneListUsers);
    };

    const handleSearch = debounce((event) => {
        console.log(event.target.value);
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter((item) => item.email.includes(term));
            console.log(cloneListUsers);
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 500);

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            if (file.type !== 'text/csv') {
                toast.error('only accept csv file');
                return;
            }
            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== 'Email' ||
                                rawCSV[0][1] !== 'First name' ||
                                rawCSV[0][2] !== 'Last name'
                            ) {
                                toast.error('Wrong format Header CSV file');
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                                console.log('result', result);
                                setListUsers(result);
                            }
                        } else {
                            toast.error('Wrong format CSV file');
                        }

                        console.log('Finished:', results.data);
                    } else {
                        toast.error('not found data on CSV file');
                    }
                    console.log(rawCSV);
                },
            });
        }
    };

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(['Id', 'Email', 'First name', 'Last name']);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
                console.log('arr', arr);
                return result;
            });

            console.log('result', result);
            setDataExport(result);
            done();
        }
    };

    return (
        <Container>
            <div className="my-3 d-sm-flex justify-content-between">
                <h3 className="">list users:</h3>
                <div className="d-flex gap-3">
                    <label className="btn btn-warning" htmlFor="test">
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input id="test" type="file" hidden onChange={(event) => handleImportCSV(event)} />

                    <CSVLink
                        data={dataExport}
                        filename={'my-file.csv'}
                        className="btn btn-primary"
                        target="_blank"
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        <i className="fa-solid fa-file-arrow-down"></i> Export
                    </CSVLink>
                    <button className="btn btn-primary" onClick={() => setIsShowModalAddNew(true)}>
                        <i className="fa-solid fa-circle-plus"></i> Add new user
                    </button>
                </div>
            </div>
            <div className="col-12 col-sm-4 my-3">
                <input
                    className="form-control"
                    placeholder="Search user by email..."
                    // value={keyword}
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <div className="customize-table">
                <Table>
                    <thead>
                        <tr>
                            <th>
                                <div className="sort-header">
                                    <span>ID</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-sort-down"
                                            onClick={() => handleSort('desc', 'id')}
                                        ></i>
                                        <i className="fa-solid fa-sort-up" onClick={() => handleSort('asc', 'id')}></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className="sort-header">
                                    <span>FirstName</span>
                                    <span>
                                        <i
                                            className="fa-solid fa-arrow-up-long"
                                            onClick={() => handleSort('asc', 'first_name')}
                                        ></i>
                                        <i
                                            className="fa-solid fa-arrow-down-long"
                                            onClick={() => handleSort('desc', 'first_name')}
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>LastNAme</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`users${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning mx-3"
                                                onClick={() => handleEditUser(item)}
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteUSer(item)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
                handleEditUserFromModal={handleEditUserFromModal}
                isEdit={isEdit}
                dataUserEdit={dataUserEdit}
            />

            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserForm={handleDeleteUserForm}
            />
        </Container>
    );
};

export default TableUsers;
