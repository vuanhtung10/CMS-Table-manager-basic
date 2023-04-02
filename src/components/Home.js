import Container from 'react-bootstrap/Container';

const Home = () => {
    return (
        <>
            <Container>
                <div>
                    <b> Yêu cầu:</b>
                </div>
                <p> Sử dụng API từ trang web https://reqres.in/ để tạo website.</p>
                <p>Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm các chức năng:</p>
                <ul>
                    <li>1. Đăng nhập</li>
                    <li>2. Thêm User</li>
                    <li>3. Sửa User</li>
                    <li>4. Xoá User</li>
                    <li>5. Hiển thị tất cả các User</li>
                    <li>6. Tìm kiếm User theo Id</li>
                    <li>7. Sắp xếp theo FirstName</li>
                    <li>8. Import User từ file .csv</li>
                    <li>9. Export User ra file .csv</li>
                </ul>
                <p>Tự do tùy chỉnh html, css, để có một website nhẹ nhàng, khoa học và đẹp.</p>
                <p>Commit và đẩy source code lên github public.</p>
                <p>Triển khai website lên Heroku để demo</p>
                <p>
                    <b>Result</b>
                </p>
                <p>Thời gian hoàn thành: 1-3 ngày</p>
                <p>Gửi link Heroku và Github link lại email này</p>
                <p>Thời gian phản hồi 2 ngày làm việc kể từ ngày nhận được bài thi</p>
                <p>
                    Yêu cầu backend (optional - không bắt buộc): Sử dụng python django rest framework, tạo các api như
                    trên trang web: https://reqres.in/{' '}
                </p>
            </Container>
        </>
    );
};

export default Home;
