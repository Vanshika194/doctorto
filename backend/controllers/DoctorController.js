import doctorModel from "../modles/doctorModel.js"



const changeAvailabity = async (req, res) => {
  try {
    
    const { docId } = req.body; // Ensure `docId` is passed in the request body
    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      { available: !docData.available },
      { new: true } // Return the updated document
    );

    res.json({ success: true, message: "Availability changed", data: updatedDoctor });
  } catch (error) {
    console.error("Error updating availability:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const doctorLists = async (req,res)=>{
  try {
    const doctors=await doctorModel.find({}).select(['-password','-email'])
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
  }
}
export {changeAvailabity , doctorLists}
