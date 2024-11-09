import React from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import cameraIcon from "../assets/camera-icon.png";
import "../css/ScreenshotButton.css";

const ScreenshotButton = ({ className }) => {
  const handleTakeScreenshot = () => {
    const element = document.querySelector(`.${className}`);

    if (element) {
      html2canvas(element, { useCORS: true })
        .then(async (canvas) => {
          const { data } = await axios.get("http://localhost:8000/auth/user/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });

          if (data === undefined) {
            alert("You should login first!");
            return;
          }

          // Convert canvas to a Blob for file upload and download
          canvas.toBlob((blob) => {
            if (!blob) {
              alert("Failed to take screenshot.");
              return;
            }

            // Download the image as a file
            const imageUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "screenshot.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(imageUrl); // Clean up the URL object

            alert(
              "Screenshot taken and downloaded! Now sending to the server..."
            );

            // Create FormData and add 'username' and 'image'
            const formData = new FormData();
            formData.append("username", data.username); // Add username as a field
            formData.append("image", blob, "screenshot.png"); // Append Blob as a file

            // Send the screenshot to the API
            axios
              .post("http://127.0.0.1:8000/gallery/api/upload/", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                console.log(
                  "Screenshot successfully sent to server:",
                  response.data
                );
                alert("Screenshot sent to server successfully!");
              })
              .catch((error) => {
                console.error("Error sending screenshot to server:", error);
                alert("Error sending screenshot to server.");
              });
          }, "image/png"); // Specify image type as PNG
        })
        .catch((error) => {
          console.error("Error capturing screenshot:", error);
          alert("Error capturing screenshot.");
        });
    } else {
      console.error(`No element found with class name: ${className}`);
      alert(`Element with class "${className}" not found.`);
    }
  };

  return (
    <button className="screenshot-button" onClick={handleTakeScreenshot}>
      <img src={cameraIcon} alt="Take Screenshot" className="screenshot-icon" />
    </button>
  );
};

export default ScreenshotButton;
