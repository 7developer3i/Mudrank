import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BaseUrl } from "../../apis/contant";
import { Editcured } from "./edit";
import { DeleteCured } from "./delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteModalfunc, editModalfunc, fetchcuratedDetailsAsync } from "../../feature/website/curedpage/curedSlice";
import Cookies from "js-cookie";
import AuthContext from "../../context/AuthContext";

export const CuredTable = () => {

  const [curatedData, showCuratedData] = useState([]);
  const [EditData, setEditData] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const curatedState = useSelector((state)=>state.curated.data)
  const editState = useSelector((state)=>state.curated.editModal)

  const dispatch = useDispatch()
  const {adminid} = useContext(AuthContext);
  useEffect(() => {
    const token = Cookies.get("admin_token")
    dispatch(fetchcuratedDetailsAsync({token,adminid}))
  },[dispatch, adminid]);

  return (
    <div>
      {editState && (
        <Editcured
          setEditData={setEditData}
          setText={setText}
          title={title}
          setTitle={setTitle}
          text={text}
          setId={setId}
          id={id}
          showCuratedData={showCuratedData}
        />
      )}
      {DeleteModal && (
        <DeleteCured
          setDeleteModal={setDeleteModal}
          setId={setId}
          id={id}
          showCuratedData={showCuratedData}
        />
      )}
      <div class="grid lg:grid-cols-3 md:grid-cols-2 grikd-cols-1 gap-6 mt-16">
        {curatedState &&
          curatedState.map((item, index) => (
            <div>
              <div class="p-7 rounded-xl bg-amber-100 dark:bg-neutral-700/70">
                <h3 class="text-xl font-semibold mb-7">{item.title}</h3>
                <p class="font-medium leading-7 text-gray-500 mb-6 dark:text-gray-400">
                  {item.text}
                </p>

                <span class="text-yellow-500 flex">
                  <button
                    onClick={() => {
                      dispatch(editModalfunc())
                      setId(item.id);
                      setTitle(item.title);
                      setText(item.text);
                    }}
                    type="button"
                    class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setDeleteModal(true);
                      setId(item.id);
                    }}
                    type="button"
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
  
};
