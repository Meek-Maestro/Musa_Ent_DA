import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { createElement } from "react";
import { TiTickOutline } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { settingsRespository } from "@renderer/store/dexi/user.settings";

async function initializeAPI() {
    const baseURL = (await settingsRespository.getBaseURL()) || "http://localhost:3000"; // Default baseURL if not set
    console.log(baseURL)
    const api = axios.create({
        baseURL: `${baseURL}`,
        timeout: 20000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    api.interceptors.response.use(
        (response: any) => {
            if (!response.config.silent) {
                showNotification({
                    title: "Success",
                    message: response?.data?.message || "Operation successful",
                    color: "green",
                    position: "top-center",
                    style: { backgroundColor: "rgb(240, 253, 244)", padding: "20px" },
                    icon: createElement(TiTickOutline, { size: 20, color: "rgb(240, 253, 244)" }),
                    styles: {
                        description: {
                            color: "#276749",
                            fontWeight: 500,
                        },
                        title: {
                            color: "#276749",
                            fontWeight: 600,
                        },
                    },
                });
            }
            return response;
        },
        (error) => {
            if (!error.config?.silent) {
                showNotification({
                    title: "Error",
                    message: error.response?.data?.message || error?.message || "An error occurred",
                    color: "red",
                    position: "top-center",
                    style: { backgroundColor: "rgb(254, 242, 242)", padding: "20px" },
                    icon: createElement(MdClose, { size: 35, color: "white" }),
                    styles: {
                        description: {
                            color: error.response ? "#FF0000" : "#FF0000",
                            fontWeight: 500,
                        },
                        title: {
                            color: error.response ? "#FF0000" : "#FF0000",
                            fontWeight: 600,
                        },
                    },
                });
            }
            return Promise.reject(error);
        }
    );

    return api;
}

export const api = await initializeAPI();