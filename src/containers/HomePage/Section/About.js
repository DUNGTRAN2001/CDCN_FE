import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          TRUYỀN THÔNG NÓI VỀ VIỆC MUA SẮM ONLINE
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/Gzw77j0F7Ho"
              title="Người Việt thích mua sắm trực tuyến hay đến cửa hàng hơn?| VTV24"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Lý do nên mua sắm online:
              <br></br>
              -------------------------------------------------
              <br></br>1.Mua online giá rẻ hơn. Nhiều chương trình khuyến mãi
              hấp dẫn chỉ dành riêng cho khách hàng mua online
              <br></br>2. Ngồi nhà cũng săn được sale, hàng tốt, giá hời
              <br></br>3. Dễ dàng so sánh các mặt hàng và mức giá để đưa ra
              quyết định thông minh nhất
              <br></br>4. Tiết kiệm thời gian, chi phí đi lại, không cần giang
              nắng, không phải đội mưa, không phải mang vác hàng hóa.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
