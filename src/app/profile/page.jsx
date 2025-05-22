"use client";

import styles from "./Profile.module.css";
import Image from 'next/image';
import Button from "../../components/Button";
import { Header } from "antd/es/layout/layout";

export default function profile() {        
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Amanda Gomes Mechi</h1>
            <p className={styles.subtitle}> Instrutures: Thiago Ferreira e Marcello Carboni 🎀 </p>
            <p className={styles.subtitle}>1TDS1</p>
            <p className={styles.subtitle}>N°02 </p>
            <div className={styles.image}>
                <Image
                    src="/image/amanda.jpg"
                    alt="Amanda"
                    width={350}
                    height={280}
                    className={styles.image}
                    priority
                />
            </div>
            <Button />
        </div>

    );
}
