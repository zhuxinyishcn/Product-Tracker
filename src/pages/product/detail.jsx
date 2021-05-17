import React, { useState, useEffect } from "react";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { reqCategoryName } from "../../api";

export default function ProductDetail(props) {
  const [mainCategoryName, setMainCategoryName] = useState("");
  const [setChildCategoryName] = useState("");
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    getCategory();
    getProductDetail();
  }, [mainCategoryName]);

  async function getCategory() {
    const { product } = props.location.state;
    const { pCategoryId, categoryId } = product;
    // if the category id indicate it is a parent category, we just find the category in the main category
    if (pCategoryId === "0") {
      const result = await reqCategoryName(categoryId);
      // check the return result
      if (result.status === 0) setMainCategoryName(result.data.name);
    }
    // if the category indicate it is not cate a child category, we first find the main category, then search in the second category
    if (pCategoryId !== "0") {
      // we execute the the promise at once async to improve the peroformance
      const result = await Promise.all([reqCategoryName(pCategoryId), reqCategoryName(categoryId)]);

      // check the return result
      if (result[0].status === 0) {
        setMainCategoryName(result[0].data.name);
        setChildCategoryName(result[1].data.name);
      }
    }
  }

  function getProductDetail() {
    const { product } = props.location.state;
    // load data into correct data form
    const productDetail = [
      {
        title: "Name",
        context: product.name,
      },
      {
        title: "Description",
        context: product.desc,
      },
      {
        title: "Price",
        context: product.price,
      },
      {
        title: "Category",
        context: mainCategoryName,
      },
      {
        title: "Detail",
        context: product.detail,
      },
      {
        title: "Preview",
        context: "some picuture~",
      },
    ];
    setProductDetail(productDetail);
  }

  return (
    <Card
      bordered
      title={
        <span>
          <ArrowLeftOutlined
            style={{ marginRight: "5px", color: "green" }}
            onClick={() => props.history.goBack()}
          />
          Product Details
        </span>
      }
    >
      <List
        grid={{
          column: 1,
        }}
        dataSource={productDetail}
        renderItem={(item) => (
          <List.Item>
            <Card size="small" title={item.title}>
              {/* if the item is detail, display as a html context */}
              {item.title === "Detail" ? (
                <span
                  // use inner html to display detail html context
                  dangerouslySetInnerHTML={{ __html: item.context }}
                ></span>
              ) : (
                item.context
              )}
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
}
