export async function uploadToCloudinary({
    file,
    onProgress
}) {
    if (!file) throw new Error("No file provided")

    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`

    const form = new FormData()
    form.append("file", file)
    form.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", url)

        // Upload progress
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && typeof onProgress === "function") {
                const pct = Math.round((event.loaded / event.total) * 100)
                onProgress(pct)
            }
        }

        xhr.onerror = () => reject(new Error("Upload failed"))

        xhr.onload = () => {
            try {
                const res = JSON.parse(xhr.responseText)

                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        secure_url: res.secure_url,
                        bytes: res.bytes,
                        format: res.format,
                        public_id: res.public_id
                    })
                } else {
                    reject(new Error(res.error?.message || "Cloudinary error"))
                }
            } catch (err) {
                reject(err)
            }
        }

        xhr.send(form)
    })
}