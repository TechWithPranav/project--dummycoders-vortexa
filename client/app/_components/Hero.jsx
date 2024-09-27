import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <Image
          alt=""
          src="/doctors.jpg"
          width={800}
          height={800}
          className="absolute inset-0 h-full
          rounded-3xl 
          w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-4xl font-bold sm:text-4xl">
            Find & Book 
            <span className='text-primary'> Appointment </span> 
            with your Fav 
            <span className='text-primary '> Doctors</span></h2>

        <p className="mt-4 text-gray-500">
          Discover personalized healthcare services at your fingertips. Whether it's a routine check-up
          or specialized care, easily book appointments with experienced doctors from a range of fields.
          Take control of your health today with a seamless booking experience and expert medical advice tailored to you.
        </p>

        <Button className="mt-10">Explore Now</Button>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero