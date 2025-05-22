"use client";

import styles from "./Animais.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

const apiKey = "s9DgdLx8PMVarz36H1K";

export default function Animal() {
    const [data, setData] = useState({
        animal: [],
        loading: true,
        current: 1,
        pageSize: 5,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        animal: null,
        loading: true,
        dono: null,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/api/animais", {
                    headers: {
                        "x-api-key": apiKey,
                    },
                });

                setData(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        }
        fetchData();
    }, []);

    const openModal = (animal) => {
        setModalInfo({
            visible: true,
            animal,
            dono: null,
            loading: true,
        });

        const cacheKey = `dono-${animal.id}`;
        const cached = getSessionStorage(cacheKey, null);
        if (cached) {
            setModalInfo({ ...modalInfo, dono: cached, loading: false });
            return;
        }
    };

    const paginatedAnimais = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.animal.slice(start, start + data.pageSize);
    };

    return (
        <div>
            <h1 className={styles.title}>Lista de animais</h1>

            <Skeleton
            active 
            paragraph={{ rows: 3 }}
            title={{ width: 200 }}
            />
            
            <Pagination
                current={data.current}
                className={styles.pagination}
                pageSize={data.pageSize}
                total={data.animal.length}
                onChange={(page, size) =>
                    setData((d) => ({
                        ...d,
                        current: page,
                        pageSize: size,
                    }))
                }
                showSizeChanger
                pageSizeOptions={["5", "10", "20"]}
            />

            {data.loading ? (
                <Image
                    src="/media/loading.gif"
                    alt="Loading"
                    width={100}
                    height={90}
                />
            ) : (
                <div className={styles.cardContainer}>
                    {paginatedAnimais().map((animal) => (
                        <Card
                            key={animal.id}
                            className={styles.card}
                            hoverable
                            onClick={() => openModal(animal)}
                            cover={
                                <Image
                                    alt={animal.nome}
                                    src={animal.foto ? animal.foto : "/image/cachorro.jpg"}
                                    width={300}
                                    height={300}
                                />
                            }
                        >
                            <Card.Meta title={animal.nome} />
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                title={`Informações de ${modalInfo.animal?.nome}`}
                open={modalInfo.visible}
                onCancel={() =>
                    setModalInfo({
                        visible: false,
                        animal: null,
                        dono: null,
                        loading: false,
                    })
                }
                onOk={() =>
                    setModalInfo({
                        visible: false,
                        animal: null,
                        dono: null,
                        loading: false,
                    })
                }
                width={600}
            >
                {modalInfo.loading ? (
                    <Skeleton active />
                ) : modalInfo.dono ? (
                    <div className={styles.avaliacaoInfo}>
                        <p>
                            <span className={styles.label}>Nome do Dono:</span>{" "}
                            {modalInfo.dono.nome}
                        </p>
                    </div>
                ) : null}
            </Modal>

            <ToastContainer position="top-right" autoClose={4500} />
        </div>
    );
}
