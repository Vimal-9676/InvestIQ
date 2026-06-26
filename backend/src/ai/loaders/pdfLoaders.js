
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const loadPDF = async(filePath)=>{
    try {
        const loader = new PDFLoader(filePath);
        const docs = await loader.load();

        return docs.map((doc) => doc.pageContent).join("\n");

    } catch (error) {
       console.error("pdf parsing error",error);
       throw error; 
    }

}