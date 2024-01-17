import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BaseUrl } from "../../../apis/contant";
import { FooterEdit } from "./edit";
import Cookies from "js-cookie";
import AuthContext from "../../../context/AuthContext";

export const FooterTable = () => {
  const [FooterData, setFooterData] = useState([]);
  const [id, setId] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [editvalue, setEditvalue] = useState("");
  const [index, setIndex] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [oldValue, setOldValue] = useState("");
  const { adminid } = useContext(AuthContext);


  useEffect(() => {
    const token = Cookies.get("admin_token")
    axios
      .get(`${BaseUrl.url}footer_data?token=${token}&adminid=${adminid}`)
      .then((res) => {
        setFooterData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleDelete = (item, items, id) => {
    const nameValues = JSON.parse(item.name);
    const token = Cookies.get("admin_token")
    const filteredValues = nameValues.filter((value) => value !== items);
    axios
      .put(`${BaseUrl.url}footerdata/${id}`, {
        name: filteredValues,
        token: token,
        adminid: adminid
      })
      .then((res) => {
        console.log(res);
        axios
          .get(`${BaseUrl.url}footer_data?token=${token}&adminid=${adminid}`)
          .then((res) => {
            setFooterData(res.data);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {OpenEditModal && (
        <FooterEdit
          setOpenEditModal={setOpenEditModal}
          OpenEditModal={OpenEditModal}
          setFooterData={setFooterData}
          id={id}
          editvalue={editvalue}
          setEditvalue={setEditvalue}
          index={index}
          currentData={currentData}
          oldValue={oldValue}
        />
      )}

      <div class="flex flex-col justify-center items-center h-[100vh]">
        <h2 class="md:text-5xl text-3xl font-semibold tracking-tight">
          Footer Details
        </h2>
        <div class="relative flex max-w-[1200px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div class="!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div class="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <div
                className="foo_menus"
                style={{ color: "black", width: "100%" }}
              >
                <div className="foo_menus_inner" style={{ color: "black" }}>
                  {FooterData &&
                    FooterData.map((item) => (
                      <div className="fmenu_item" style={{ color: "black" }}>
                        {JSON.parse(item.name).map((items, index) => (
                          <li className="text-black" key={index} href="#">
                            {items}
                            <td className="px-16 py-2">
                              <span
                                className="text-yellow-500 flex"
                                style={{ margin: "-26px 26px" }}
                              >
                                <button
                                  onClick={() => {
                                    setOpenEditModal(!OpenEditModal);
                                    setEditvalue(items);
                                    setId(item.id);
                                    setCurrentData(item);
                                    setOldValue(items);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-green-700 mx-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(item, items, item.id);
                                    setId(item.id);
                                    setIndex(index);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-red-700"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </span>
                            </td>
                          </li>
                        ))}
                      </div>
                    ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
