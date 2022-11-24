const userModel = require("../models/userModel");
const bookingModel = require("../models/bookingModel");
const vendorModel = require("../models/vendorModel");

const isValid = function (value) {
    if (typeof value !== "string" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidUserDetails = function (name) {
    return /^[A-Za-z\s]*$/.test(name)
}


const createEntry = async function (req, res) {
    try {
        if (Object.keys(req.body).length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "Body couldnot be empty" });
        }
        let { context, type, status, customer, bookingId, bookingTime, pickupTime, source, destination, vendor } = req.body;

  //***************context,type and status validation**********************/

        if (!isValid(context)) {
            return res.status(400).send({ status: false, message: "Invalid context  or context is not mentioned." })
        }

        if (!isValid(type)) {
            return res.status(400).send({ status: false, message: "Invalid type  or type is not mentioned." })
        }


        if (!isValid(status)) {
            return res.status(400).send({ status: false, message: "Invalid status  or status is not mentioned." })
        }
        if (status == "Pending" || status  == "Confirmed" || status  == "Cancelled") { status = status }
        else
            return res.status(400).send({ msg: "status must be Pending/Confirmed/Cancelled" })

        //***************BookingId,BookingTime and PickupTime validation**********************/

        if (!bookingId) return res
            .status(400)
            .send({ status: false, message: "bookingId is required" });

        let uniqueBookingId = await bookingModel.findOne({ bookingId: bookingId });

        if (uniqueBookingId) {
            return res.status(400).send({ status: false, message: "bookingId already Used" })
        }

        if (!isValid(bookingTime)) {
            return res.status(400).send({ status: false, message: "Invalid bookingTime  or bookingTime is not mentioned." })
        }

        if (!isValid(pickupTime)) {
            return res.status(400).send({ status: false, message: "Invalid pickupTime  or pickupTime is not mentioned." })
        }

        if (!isValid(pickupTime)) {
            return res.status(400).send({ status: false, message: "Invalid pickupTime  or pickupTime is not mentioned." })
        }

        //***************customer validation**********************/
        if (!customer) return res
            .status(400)
            .send({ status: false, message: "customer details is required" });

        else {
            if (!customer.id) return res
                .status(400)
                .send({ status: false, message: "userId is required" });

            if (typeof customer.id !== "number") return res.status(400).send({ status: false, message: "customer Id is not in correct format" })

            let uniqueUserId = await userModel.findOne({ id: customer.id });
            if (uniqueUserId) {
                return res.status(400).send({ status: false, message: "UserId already Used" })
            }

            if (!isValid(customer.fullName)) {
                return res
                    .status(400)
                    .send({ status: false, message: "fullName is required" });
            }
            if (!/^[A-Za-z\s]*$/.test(customer.fullName)) return res
                .status(400)
                .send({ status: false, message: "fullName is need to be in valid format" });
            if (!customer.mobile) return res
                .status(400)
                .send({ status: false, message: "Mobile is required" });

            if (!/^((\+91 ?)|\+)?[7-9][0-9]{9}$/.test(customer.mobile)) {
                res.status(400).send({ status: false, message: "Please provide valid mobile number" });
                return;
            }

            let uniqueMobile = await userModel.findOne({ mobile: customer.mobile });
            if (uniqueMobile) {
                return res.status(400).send({ status: false, message: "mobile no. already Used" })
            }

            if (!customer.email) return res.status(400)
                .send({ status: false, message: "Email is required" });


            if (!/^[a-z0-9_.]{1,}@g(oogle)?mail\.com$/.test(customer.email.toLowerCase())) {
                return res.status(400).send({ status: false, message: "Enter a valid email" })
            }
            let uniqueEmail = await userModel.findOne({ email: customer.email });
            if (uniqueEmail) {
                return res.status(400).send({ status: false, message: "Email  already Used" })
            }

        }



        //****************Validation Of Source-part*********************/

        if (!source) return res.status(400).send({ status: false, message: "source is Mandatory" })
        else {
            if (typeof source !== 'object') {
                return res.status(400).send({ status: false, message: "source is not in correct format" })
            }

            if (!source.name) return res.status(400).send({ status: false, message: "source Name is required" })

            if (!isValid(source.name)) return res.status(400).send({ status: false, message: " source name is invalid " })

            if (!isValidUserDetails(source.name)) return res
                .status(400)
                .send({ status: false, message: "source Name is needed in proper format" });

            if (!source.address) return res.status(400).send({ status: false, message: "source address is required" })

            if (typeof source.address !== 'object') {
                return res.status(400).send({ status: false, message: "source address is not in correct format" })
            }

            if (!source.address.hasOwnProperty("address")) return res.status(400).send({ status: false, message: "source address is required " })

            if (!isValid(source.address.address)) return res.status(400).send({ status: false, message: " source address is invalid " })

            if (!source.address.hasOwnProperty("location")) return res.status(400).send({ status: false, message: "source location is required " })

            if (!isValid(source.address.location)) return res.status(400).send({ status: false, message: " source location is invalid " })

            if (!source.address.hasOwnProperty("city")) return res.status(400).send({ status: false, message: "source city is required " })

            if (!isValid(source.address.city)) return res.status(400).send({ status: false, message: " source city is invalid " })

            if (!isValidUserDetails(source.address.city)) return res
                .status(400)
                .send({ status: false, message: "source city is needed in proper format" });

            if (!source.address.hasOwnProperty("state")) return res.status(400).send({ status: false, message: "source state is required " })

            if (!isValid(source.address.state)) return res.status(400).send({ status: false, message: " source state is invalid " })

            if (!isValidUserDetails(source.address.state)) return res
                .status(400)
                .send({ status: false, message: "source state is needed in proper format" });

            if (!source.address.hasOwnProperty("postalCode")) return res.status(400).send({ status: false, message: "source postalCode is required " })

            if (!/^[1-9]{1}[0-9]{2}[0-9]{3}$/.test(source.address.postalCode)) return res.status(400).send({ status: false, message: " source postalCode is invalid" })

            if (!source.address.hasOwnProperty("country")) return res.status(400).send({ status: false, message: "source country is required " })

            if (!isValid(source.address.country)) return res.status(400).send({ status: false, message: " source country is invalid " })

            if (!isValidUserDetails(source.address.country)) return res
                .status(400)
                .send({ status: false, message: "source country is needed in proper format" });

            if (!source.hasOwnProperty("latitude")) return res.status(400).send({ status: false, message: "source latitude is required " })


            // if (!isValid(source.latitude)) return res.status(400).send({ status: false, message: "source latitude is invalid  " })

            if (!/^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/.test(source.latitude)) return res.status(400).send({ status: false, message: "source latitude is invalid " })


            if (!source.hasOwnProperty("longitude")) return res.status(400).send({ status: false, message: "source longitude is required " })

            if (!/^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/.test(source.longitude)) return res.status(400).send({ status: false, message: "source longitude is invalid " })

            // if (!isValid(source.longitude)) return res.status(400).send({ status: false, message: "source longitude is invalid  " })


        }


        //****************Validation Of destination-part*********************/

        if (!destination) return res.status(400).send({ status: false, message: "destination is Mandatory" })
        else {
            if (typeof destination !== 'object') {
                return res.status(400).send({ status: false, message: "destination is not in correct format" })
            }

            if (!destination.name) return res.status(400).send({ status: false, message: "destination Name is required" })

            if (!isValid(destination.name)) return res.status(400).send({ status: false, message: " destination name is invalid " })

            if (!isValidUserDetails(destination.name)) return res
                .status(400)
                .send({ status: false, message: "destination name is needed in proper format" });

            if (!destination.address) return res.status(400).send({ status: false, message: "destination address is required" })

            if (typeof destination.address !== 'object') {
                return res.status(400).send({ status: false, message: "destination address is not in correct format" })
            }

            if (!destination.address.hasOwnProperty("address")) return res.status(400).send({ status: false, message: "destination address is required " })

            if (!isValid(destination.address.address)) return res.status(400).send({ status: false, message: " destination address is invalid " })

            if (!destination.address.hasOwnProperty("location")) return res.status(400).send({ status: false, message: "destination location is required " })

            if (!isValid(destination.address.location)) return res.status(400).send({ status: false, message: " destination location is invalid " })

            if (!destination.address.hasOwnProperty("city")) return res.status(400).send({ status: false, message: "destination city is required " })

            if (!isValid(destination.address.city)) return res.status(400).send({ status: false, message: " destination city is invalid " })
            if (!isValidUserDetails(destination.address.city)) return res
                .status(400)
                .send({ status: false, message: "destination city is needed in proper format" });

            if (!destination.address.hasOwnProperty("state")) return res.status(400).send({ status: false, message: "destination state is required " })

            if (!isValid(destination.address.state)) return res.status(400).send({ status: false, message: " destination state is invalid " })

            if (!isValidUserDetails(destination.address.state)) return res
                .status(400)
                .send({ status: false, message: "destination state is needed in proper format" });

            if (!destination.address.hasOwnProperty("postalCode")) return res.status(400).send({ status: false, message: "destination postalCode is required " })

            if (!/^[1-9]{1}[0-9]{2}[0-9]{3}$/.test(destination.address.postalCode)) return res.status(400).send({ status: false, message: " destination postalCode is invalid" })


            if (!destination.address.hasOwnProperty("country")) return res.status(400).send({ status: false, message: "destination country is required " })

            if (!isValid(destination.address.country)) return res.status(400).send({ status: false, message: " destination country is invalid " })

            if (!isValidUserDetails(destination.address.country)) return res
                .status(400)
                .send({ status: false, message: "destination country is needed in proper format" });

            if (!destination.address.hasOwnProperty("coordinates")) return res.status(400).send({ status: false, message: "destination coordinates is required " })

            if (typeof destination.address.coordinates !== 'object') {
                return res.status(400).send({ status: false, message: "destination coordinates is not in correct format" })
            }

            if (!destination.address.coordinates.hasOwnProperty("latitude")) return res.status(400).send({ status: false, message: "destination latitude is required " })

            if (!/^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/.test(destination.address.coordinates.latitude)) return res.status(400).send({ status: false, message: "destination latitude is invalid " })

            if (!destination.address.coordinates.hasOwnProperty("longitude")) return res.status(400).send({ status: false, message: "destination longitude is required " })

            if (!/^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/.test(destination.address.coordinates.longitude)) return res.status(400).send({ status: false, message: "destination longitude is invalid " })

        }


        //****************Validation Of vender-part*********************/

        if (!vendor) return res.status(400).send({ status: false, message: "Vendor details is required" })
        else {
            if (typeof vendor !== 'object') {
                return res.status(400).send({ status: false, message: "vendor details is not in correct format" })
            }

            if (!vendor.hasOwnProperty("id")) return res.status(400).send({ status: false, message: "vendor id is required " })
            const uniqueVendor = await vendorModel.findOne({ id: vendor.id })
            if (uniqueVendor) return res.status(400).send({ status: false, message: "vendor Id  already Used" })


            if (!vendor.hasOwnProperty("fullName")) return res.status(400).send({ status: false, message: "vendor fullName is required " })

            if (!isValidUserDetails(vendor.fullName)) return res
                .status(400)
                .send({ status: false, message: "vendor fullName is needed in proper format" });

            if (!vendor.hasOwnProperty("vehicleNumber")) return res.status(400).send({ status: false, message: "vendor vehicleNumber is required " })

            const uniqueVehical = await vendorModel.findOne({ vehicleNumber: vendor.vehicleNumber })

            if (uniqueVehical) return res.status(400).send({ status: false, message: "vehical number already in Used" })

            if (!vendor.hasOwnProperty("vehicleModel")) return res.status(400).send({ status: false, message: "vendor vehicleModel is required " })
        }
        //****************Creating Entry In respected DB*********************/

        const createUser = await userModel.create(req.body.customer)
        const createBooking = await bookingModel.create(req.body)
        const createVendor = await vendorModel.create(req.body.vendor)
        return res.status(201).send({ status: true, message: "Entry created succesfully", data: { createUser, createBooking, createVendor } })
    }
    catch (error) {
        console.log("This is the error :", error.message)
        res.status(500).send({ msg: "Error", error: error.message })
    }
}


module.exports.createEntry = createEntry
