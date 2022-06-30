import React from 'react';
import { useRouter } from "next/router";

const Footer = () => {
    const router= useRouter();
    return (
        <section className='mt-5 pt-5 '>
          <div className='footer fixed-bottom border-top me-4 ms-4'>
                <p className='pt-3 text-center'>© 2022 DotOnline. All rights reserved.</p>
            </div>
         
        </section>
       
    );
};

export default Footer;