import Doctor from "../../Models/Doctor";
import { Response, Request, NextFunction } from "express";
import CustomError from "../../utils/CustomError";
import DrDetails from "../../Models/DoctorDetails";

interface FileWithLocation extends Express.Multer.File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    location: string;
};

export const viewalldoctors = async (req: Request, res: Response, next: NextFunction) => {
    const AllDoctors = await Doctor.find({ isDeleted: false })
    if (!AllDoctors) {
        return next(new CustomError("no Doctors found",404))
    }
    res.status(200).json({
        status: 200,
        message: "docor Data",
        Data: AllDoctors
    })
}

export const viewDRbyId = async (req: Request, res: Response, next: NextFunction) => {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor) {
        return next(new CustomError("There is any doctor found with this ID",404))
    }
    res.status(200).json({
        message: "One doctor data",
        Data: doctor
    })
}


export const addDetails = async (req: Request, res: Response, next: NextFunction) => {

    const { doctor, qualification, specialization, availablity, description, address } = req.body

    if (!doctor || !qualification || !specialization || !availablity || !description || !address) {
        return next(new CustomError("All required fields must be provided", 400));
    }

    const files = req.files as { [fieldname: string]: FileWithLocation[] }

    const profileImage = files["profileImage"]?.[0]?.location;

    const certificates = files["certificates"]?.map(file => file.location) || [];
    console.log("cirtificate", certificates);


    const newDetails = new DrDetails({
        doctor,
        qualification: JSON.parse(qualification),
        specialization: JSON.parse(specialization),
        availablity,
        profileImage,
        description,
        address,
        certificates,
    });

    await newDetails.save();

    res.status(201).json({
        message: "Details added successfully",
        data: newDetails,
    });

};


export const getdrDetails = async (req: Request, res: Response, next: NextFunction) => {


    const Details = await DrDetails.find({ doctor: req.params.id }).populate("doctor", "name email phone")
    if (!Details) {
        return next(new CustomError("there is no details find about this doctor",404))
    }


    res.status(200).json({
        Message: "Doctor details",
        data: Details
    })
}

export const editDetails = async (req: Request, res: Response, next: NextFunction) => {

    const doctor = req.params.id;
    const { qualification, specialization, availablity, description, address } = req.body;

    if (!qualification || !specialization || !availablity || !description || !address) {
        return next(new CustomError("All required fields must be provided", 400));
    }

    const files = req.files as { [fieldname: string]: FileWithLocation[] };

    const existingDetails = await DrDetails.findOne({ doctor });
    if (!existingDetails) {
        return next(new CustomError("Doctor details not found", 404));
    }

    existingDetails.qualification = JSON.parse(qualification);
    existingDetails.specialization =JSON.parse(specialization) ;
    existingDetails.availablity = availablity;
    existingDetails.description = description;
    existingDetails.address = address;

    if (files["profileImage"] && files["profileImage"].length > 0) {
        existingDetails.profileImage = files["profileImage"][0].location;
    }

    if (files["certificates"] && files["certificates"].length > 0) {
        existingDetails.certificates = existingDetails.certificates.concat(
            files["certificates"].map(file => file.location)
        );
    }
    

    await existingDetails.save();

    res.status(200).json({
        message: "Details updated successfully",
        data: existingDetails,
    });

};

export const deleteDr = async (req: Request, res: Response, next: NextFunction) => {

    const doctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
        { new: true }
    );

    if (!doctor) {
        return next(new CustomError("Doctor not found", 404));
    }

    res.status(200).json({
        message: "Doctor marked as deleted successfully",
        data: doctor,
    });

}

