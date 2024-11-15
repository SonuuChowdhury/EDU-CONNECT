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
                const UpdateOnDataBaseStatus = await axios.put('https://institute-site-az-bug-busters-33ps.onrender.com/api/update/mastersecetion',{
                    deleteItem:true,
                    itemID:ItemData._id
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
                console.log(err)
                return { status: 500 };
            }

        }

        let fileUpdating=true;
        let UploadedimageURL;
        const FileName = `${ItemData.title}_MasterPhoto`;
        if (FileData) {
            // Fetch authentication details from your backend
            const authResponse = await fetch("https://institute-site-az-bug-busters-33ps.onrender.com/api/get-authentication-parameters");

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
                authenticationEndpoint: "https://institute-site-az-bug-busters-33ps.onrender.com/api/    get-authentication-parameters"
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
            const UpdateOnDataBaseStatus = await axios.put('https://institute-site-az-bug-busters-33ps.onrender.com/api/update/mastersecetion',{
                itemID:ItemData._id,
                url:UploadedimageURL,
                tittle:ItemData.title
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
        }else if(!fileUpdating){

            const UpdateOnDataBaseStatus = await axios.put('https://institute-site-az-bug-busters-33ps.onrender.com/api/update/mastersecetion',{
                itemID:ItemData._id,
                url:ItemData.link,
                tittle:ItemData.title
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
            return { status: 500 };
        }




   
    } catch (err) {
        console.log("Error during Updating:", err);
        return { status: 500, message: err.message };
    }
}

