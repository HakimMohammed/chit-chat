import { useState, useEffect } from "react";
import { storage } from "./FirebaseConfiguration";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function FirestoreTest() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const imagesRef = ref(storage, `users-images`);
  useEffect(() => {
    listAll(imagesRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImages((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const uploadImage = () => {
    if (image == null) return;
    const imageRef = ref(storage, `users-images/${image.name + v4()}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url)=>{
            setImages((prev)=>[...prev,url])
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Firestore Test</h1>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={uploadImage}>Upload image</button>

      {images.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
}
