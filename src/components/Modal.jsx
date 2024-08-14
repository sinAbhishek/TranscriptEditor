import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const ModalCom = ({
  correct,
  correctAll,
  open,
  handleClose,
  handleChange,
  newtext,
}) => {
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "20px",
    overflow: "hidden",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className=" flex flex-col items-center justify-center  h-[200px] gap-5 bg-slate-100 p-4">
          <input
            className=" w-full border border-slate-300 px-2 py-1 outline-none rounded-md"
            type="text"
            value={newtext}
            onChange={handleChange}
          />
          <div className=" flex justify-center items-center gap-2 ">
            <button
              className=" w-max px-2 py-1 bg-sky-400 flex rounded-md justify-center items-center text-white font-medium"
              onClick={() => correct()}
            >
              Correct
            </button>
            <button
              className=" w-max px-2 py-1 bg-green-400 rounded-md flex justify-center items-center text-white font-medium"
              onClick={() => correctAll()}
            >
              Correct All
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCom;
