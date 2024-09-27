// import { motion } from "framer-motion";
// import { cn } from "../../_lib";

// const AnimationContainer = ({ children, className, delay = 0.2, reverse }) => {
//     return (
//         <motion.div
//             className={cn("w-full h-full", className)}
//             initial={{ opacity: 0, y: reverse ? -20 : 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: delay, duration: 0.4, ease: "easeInOut" }}
//         >
//             {children}
//         </motion.div>
//     );
// };

// export default AnimationContainer;

"use client";
import { CSSTransition } from 'react-transition-group';
import './animation.css'; // Define your CSS animations here

const AnimationContainer = ({ children, className, delay = 0.2, reverse }) => {
    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={400}
            classNames="fade"
            style={{ transitionDelay: `${delay}s` }}
        >
            <div className={className}>
                {children}
            </div>
        </CSSTransition>
    );
};

export default AnimationContainer;
