import React, { useState } from "react";
import { storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const STORAGE_KEY = "images/";

export default function FirebaseUpload() {
  const [fileAdded, setFileAdded] = useState(null);
  const [fileValue, setFileValue] = useState("");
  const [displayedUrl, setDisplayedUrl] = useState();

  const submitData = () => {
    if (!fileAdded) {
      alert("Upload a file first");
      return;
    }
    const fullStorageRef = storageRef(storage, STORAGE_KEY + fileAdded.name);
    uploadBytes(fullStorageRef, fileAdded).then(() => {
      getDownloadURL(fullStorageRef).then((url) => {
        setDisplayedUrl(url);
        setFileAdded(null);
        setFileValue("");
      });
    });
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        value={fileValue}
        onChange={(e) => {
          setFileAdded(e.target.files[0]);
          setFileValue(e.target.value);
        }}
      />
      <button onClick={submitData}>Send</button>
      {displayedUrl ? (
        <a href={displayedUrl}>Link to Uploaded File</a>
      ) : (
        <div>"NO URL YET"</div>
      )}
    </div>
  );
}
