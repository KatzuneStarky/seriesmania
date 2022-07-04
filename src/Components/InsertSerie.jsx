import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from 'react-toastify'
import { MdAddAPhoto } from 'react-icons/md'
import { BiCloudUpload } from 'react-icons/bi'

function InsertSerie() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [nombreSerie, setNombreSerie] = useState("")
    const [numeroCaps, setNumeroCaps] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", selectedImages);
        formData.append("upload_preset", "image-uploader");

        const postImage = async () => {
            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dyf4qordt/image/upload",
                    formData,
                );
                setImageData(response.data.url);
                toast.success("Imagen subida")
            } catch (error) {
                toast.error("Ocurrio un error", error)
            }
        };
        postImage();
    };

    const postData = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/api/series", {
            name: nombreSerie,
            numCaps: numeroCaps,
            description: descripcion,
            imageUrl: imageData
        })
        .then(
            toast.success("Datos subidos")
        )
        .catch(
            (err) => toast.error("Ocurrio un error", err)
        )
    }

    return (
        <Box className="data-container">
            <TextField
                required
                id="outlined-required"
                label="Nombre serie"
                sx={{
                    width: "80%",
                    margin: "20px",
                }}
                value={nombreSerie}
                onChange={(e) => setNombreSerie(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
            />
            <TextField
                required
                id="outlined-required"
                label="Numero Capitulos"
                sx={{
                    width: "80%",
                    margin: "20px",
                }}
                value={numeroCaps}
                onChange={(e) => setNumeroCaps(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
            />

            <TextField
                multiline
                required
                label="Descripcion de la serie"
                rows={5}
                sx={{
                    width: "80%",
                    margin: "20px",
                    color: "white"
                }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                InputLabelProps={{ style: { color: "white" } }}
            />

            <Box>
                <img  src={imageData} alt="" style={{ "width": "150px", "height" : "150px" }}/>
                <input
                    type={"file"}
                    name="file"
                    id="file"
                    className=""
                    onChange={(e) => setSelectedImages(e.target.files[0])}
                />
                <label htmlFor="file" className="btn-upload" style={{"--clr" : "#1e9bff"}}>
                    <span><MdAddAPhoto /> &nbsp; Escoge una foto <i></i></span>
                    </label>
            </Box>
            <button className="btn-upload" style={{"--clr" : "#1e9bff"}} onClick={uploadImage}>
                <span><BiCloudUpload /> &nbsp; Subir Imagen <i></i></span>
            </button>
            <Button type="button" variant="contained" sx={{margin: "10px"}} size="large" onClick={postData}>Subir data</Button>
        </Box>
    );
}

export default InsertSerie;
