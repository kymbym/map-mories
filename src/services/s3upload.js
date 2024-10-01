import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
const REGION = import.meta.env.VITE_AWS_REGION;

AWS.config.update({
  region: REGION,
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

export const uploadFile = async (file) => {
    const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
    };

    try {
        const upload = await s3.putObject(params).promise();
        console.log(upload);
        const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file.name}`;
        return url;
    } catch (error) {
        console.error(error);
        throw new Error("error uploading file", error.message);
    }
};

