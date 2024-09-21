//Arya's QR Code generator
//I have used libraries -> qrcode,react

import qrcode from "qrcode";
import { useState, useRef } from "react";

export default function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [msg, setMsg] = useState("");

  const canvasRef = useRef(null);
  const hUrl = (event) => {
    setUrl(event.target.value);
  };

  // Handle color change
  const hColor = (event) => {
    setColor(event.target.value);
  };

  const generateQRCode = (event) => {
    if (url === "") {
      setMsg("Enter URL to generate QR code");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
    event.preventDefault();
    qrcode.toCanvas(
      canvasRef.current,
      url,
      {
        color: {
          dark: color,
          light: "#000000",
        },
        width: 300,
        margin: 1,
      },
      (error) => {
        if (error) {
          console.error(error);
          setQrGenerated(false);
        } else {
          setQrGenerated(true);
        }
      }
    );
  };

  //does not require for you to choose colors
  const quickGenerate = (event) => {
    if (url === "") {
      setMsg("Enter URL to generate QR code");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
    event.preventDefault();
    qrcode.toCanvas(
      canvasRef.current,
      url,
      {
        color: {
          dark: "#FFFFFF",
          light: "#000000",
        },
        width: 300,
        margin: 1,
      },
      (error) => {
        if (error) {
          console.error(error);
          setQrGenerated(false);
        } else {
          setQrGenerated(true);
        }
      }
    );
  };

  const reset = (event) => {
    window.location.reload();
  };

  //to download the QR code
  const downloadQRCode = () => {
    if (qrGenerated === false) {
      setMsg("Generate QR code first");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
    const canvas = canvasRef.current;
    const url = canvas.toDataURL();
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "qrCode.png";
    downloadLink.click();
  };

  const copyQRCode = (event) => {
    if (qrGenerated === false) {
      setMsg("Generate QR code first");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
    event.preventDefault();
    const canvas = canvasRef.current;
    //convert the image to clipboard format
    canvas.toBlob(async (blob) => {
      try {
        //to create an instance of clipboard class
        const clipboardItem = new ClipboardItem({ "image/png": blob });
        //copy this item to our clipboard
        await navigator.clipboard.write([clipboardItem]);
        setMsg("QR code copied to clipboard");
        setTimeout(() => {
          setMsg("");
        }, 2000);
      } catch (error) {
        console.log("Failed to copy: ", error);
        setMsg("Failed to copy QR code");
        setTimeout(() => {
          setMsg("");
        }, 2000);
      }
    });
  };

  return (
    <center>
      <h1>QR Code Generator</h1>
      <div className="container">
        <form>
          <input
            type="text"
            placeholder="Enter URL to generate QR code"
            onChange={hUrl}
            value={url}
          />
          <br />
          <br />
          <span style={{ marginLeft: "10px" }}>You can select any color:</span>
          <br />
          <input
            type="radio"
            name="color"
            value="#FFFFFF"
            checked={color === "#FFFFFF"}
            onChange={hColor}
          />{" "}
          White
          <input
            type="radio"
            name="color"
            value="#FFFF00"
            checked={color === "#FFFF00"}
            onChange={hColor}
          />{" "}
          Yellow
          <input
            type="radio"
            name="color"
            value="#FF0000"
            checked={color === "#FF0000"}
            onChange={hColor}
          />{" "}
          Red
          <input
            type="radio"
            name="color"
            value="#008000"
            checked={color === "#008000"}
            onChange={hColor}
          />{" "}
          Green
          <input
            type="radio"
            name="color"
            value="#0000FF"
            checked={color === "#0000FF"}
            onChange={hColor}
          />{" "}
          Blue
          <br />
          <br />
          <button type="button" onClick={generateQRCode}>
            Generate
          </button>
          <button type="button" onClick={quickGenerate}>
            Quick Generate
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
          <br />
          <button type="button" onClick={downloadQRCode}>
            Download QR{" "}
          </button>
          <button type="button" onClick={copyQRCode}>
            Copy QR
          </button>
        </form>
        <h2>{msg}</h2>
        <canvas ref={canvasRef}></canvas>
      </div>
    </center>
  );
}
