import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/emails';

const resend = new Resend('re_j8jXM3AB_4CFWctPUMiCMv2xHftGG9chK');

export async function POST(req){

    const response=await req.json()
    const result=response.data;
    try{

        const data=await resend.emails.send({
            from: 'shri.radhekrishna274@gmail.com',
            to: [response.data.Email],
            subject: 'Appointment Booking Confirmation',
            react: EmailTemplate({result})
          });
        return NextResponse.json({data})
    }
    catch(error)
    {
        return NextResponse.json({error})
    }
}