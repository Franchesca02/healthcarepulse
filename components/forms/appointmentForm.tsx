"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import {
  Form, 
  FormControl} from "@/components/ui/form"
import CustomFormField from "../customFormField"
import SubmitButton from "../submitButton"
import { useState } from "react"
// import { AppointmentFormValidation } from "@/lib/validation"
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./patientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import { createAppointment } from "@/lib/actions/appointment.actions"


const  AppointmentForm = ({
    userId, patientId, type
}: {userId: string
    patientId: string
    type: "create" | "cancel" | "schedule"
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(false);

    
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }


    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          // appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        // const updatedAppointment = await updateAppointment(appointmentToUpdate);

        // if (updatedAppointment) {
        //   setOpen && setOpen(false);
        //   form.reset();
        // }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
  }

  return (
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
<h1 className="header">Book a new appointment</h1>
<p className="text-dark-700">Requset a new appointment in a few seconds</p>
        </section>
        {type !== "cancel" && (
            <>
             <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField 
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Expected appointment date"
          showTimeSelect
          dateFormat="MM/dd/yyy - h:mm aa"
          />

          <div className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}>
<CustomFormField 
 fieldType={FormFieldType.TEXTAREA}
 control={form.control}
 name="reason"
 label="Reason for the appointment"
 placeholder="Enter reason for the appointment"
/>
<CustomFormField 
 fieldType={FormFieldType.TEXTAREA}
 control={form.control}
 name="note"
 label="Note"
 placeholder="Enter notes"
/>
          </div>
            </>
        )}

        {type === "cancel" && (
            <CustomFormField 
 fieldType={FormFieldType.TEXTAREA}
 control={form.control}
 name="cancellationReason"
 label="Reason for the cancellation"
 placeholder="Enter reason for cancellation"
/>
        )}
    
        
        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ?
         'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>
      </form>
      </ Form>
    
  )
}


export default AppointmentForm
