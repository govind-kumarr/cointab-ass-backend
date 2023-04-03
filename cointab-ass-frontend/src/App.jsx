import "./App.css";
import { AllRoutes } from "./pages/AllRoutes";
import { style } from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/feature";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const { isModalOpen, modalMessage } = useSelector((state) => state);
  return (
    <div className="App">
      <Modal
        open={isModalOpen}
        onClose={() => dispatch(closeModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalMessage}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          <Button
            variant="contained"
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            close
          </Button>
        </Box>
      </Modal>
      <AllRoutes />
    </div>
  );
}

//for development purposes
// export const baseUrl = "http://localhost:8080/";

//for production purposes
export const baseUrl = "https://cloudy-tan-slip.cyclic.app/";

export default App;
