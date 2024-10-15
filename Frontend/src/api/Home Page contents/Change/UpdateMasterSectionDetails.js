import ImageKit from 'imagekit-javascript';
import axios from 'axios';

export default async function UpdateMasterSectionDetails(FileData, ItemData, DeleteItem) {
    try {
        const token=localStorage.getItem('aot-student-login-authorization-token')
        if (!token) {
            console.log('No token found in localStorage.');
            return {'status':500}; 
        }

        if(DeleteItem){
            try{
                const UpdateOnDataBaseStatus = await axios.put('https://institute-site-az-bug-busters.onrender.com/api/student/change-photo/update-or-delete',{
                    update:false
                },{
                    headers: {
                        'aot-student-login-authorization-token':token
                    }})
                if(UpdateOnDataBaseStatus.status==200){
                    return { status: 200 };
                }else{
                    console.log(UpdateOnDataBaseStatus)
                    return { status: 500};
                }
            }catch(err){
                return { status: 500 };
            }

        }
        // Fetch authentication details from your backend
        const authResponse = await fetch("https://institute-site-az-bug-busters.onrender.com/api/student/change-photo");

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
            authenticationEndpoint: "https://institute-site-az-bug-busters.onrender.com/api/student/change-photo/"
        });

        const FileName = `${ItemData.roll}_Profile_Picture`;
        if (!FileData) {
            return { status: 500, message: "File data is missing." };
        }

        // Upload the file with the fetched authentication details
        const UploadStatus = await ImageKitInstance.upload({
            file: FileData,
            fileName: FileName,
            folder: '/StudentProfilePictures/',
            useUniqueFileName: false,
            overwriteFile: true,
            token: authData.token,
            signature: authData.signature,
            expire: authData.expire
        });

        const imageURL = UploadStatus.url;

        if(UploadStatus.$ResponseMetadata.statusCode===200){
            const UpdateOnDataBaseStatus = await axios.put('https://institute-site-az-bug-busters.onrender.com/api/student/change-photo/update-or-delete',{
                url:imageURL,
                update:true
            },{
                headers: {
                    'aot-student-login-authorization-token':token
                }})
            if(UpdateOnDataBaseStatus.status==200){
                return { status: 200 };
            }else{
                console.log(UpdateOnDataBaseStatus)
                return { status: 500,msg:"hello" };
            }
        }else{
            return { status: 500 };
        }
   
    } catch (err) {
        console.log("Error during upload:", err);
        return { status: 500, message: err.message };
    }
}

