import ImageKit from 'imagekit-javascript';
import axios from 'axios';

export default async function AddMasterSectionDetails(FileData, tittle) {
    try {
        const token=localStorage.getItem('aot-student-login-authorization-token')
        if (!token) {
            console.log('No token found in localStorage.');
            return {'status':500}; 
        }

        let fileUpdating=true;
        let UploadedimageURL;
        const FileName = `${tittle}_MasterPhoto`;
        if (FileData) {
            // Fetch authentication details from your backend
            const authResponse = await fetch("https://advanced-institute-management-portal.onrender.com/api/get-authentication-parameters");

            if (!authResponse.ok) {
                return {'status':500}; 
            }
        
            const authData = await authResponse.json();

            if (!authData.token || !authData.signature || !authData.expire) {
                return {'status':500}; 
            }

            const ImageKitInstance = new ImageKit({
                publicKey: "public_t9hfh2XHEFiWJT3/VxAchbic9EQ=",
                urlEndpoint: "https://ik.imagekit.io/azzbbadmin/",
                authenticationEndpoint: "https://advanced-institute-management-portal.onrender.com/api/    get-authentication-parameters"
            });



            // Upload the file with the fetched authentication details
            const UploadStatus = await ImageKitInstance.upload({
                file: FileData,
                fileName: FileName,
                folder: '/home/masterphotos/',
                useUniqueFileName: false,
                overwriteFile: true,
                token: authData.token,
                signature: authData.signature,
                expire: authData.expire
            });
            UploadedimageURL = `${UploadStatus.url}?updatedAt=${Date.now()}`;

        }else{
            fileUpdating = false;
        }

        if(fileUpdating){
            const UpdateOnDataBaseStatus = await axios.put('https://advanced-institute-management-portal.onrender.com/api/update/mastersecetion',{
                createNew:true,
                tittle:tittle,
                url:UploadedimageURL
            },{
                headers: {
                    'aot-student-login-authorization-token':token
                }})
            if(UpdateOnDataBaseStatus.status==200){
                return { status: 200 };
            }else{
                console.log(UpdateOnDataBaseStatus)
                return { status: 500,msg:"Upload error" };
            }
        }else{
            return {status:4041}
        }

   
    } catch (err) {
        console.log("Error during Updating:", err);
        return { status: 500, message: err.message };
    }
}

