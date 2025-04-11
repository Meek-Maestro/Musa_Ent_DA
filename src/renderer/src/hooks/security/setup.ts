import { useForm } from "@mantine/form";
import { settingsRespository } from "@renderer/store/dexi/user.settings";
import axios from "axios";
import { useState } from "react"


interface formProps {
    baseUrl: string
}

export function useSystemInitializer() {
    const [loading, setLoading] = useState<boolean>(false)
    const [state, setState] = useState({
        loading: false,
        state: "",
        savingUrl: false
    })
    const baseUrlForm = useForm<formProps>({
        initialValues: {
            baseUrl: ""
        },
        validate: {
            baseUrl: (value) => /^(https?:\/\/)[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(:\d+)?(\/.*)?$/.test(value) ? null : "Please enter a valid URL starting with http:// or https://"
        }
    })

    function delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function checkApiHealth(): Promise<boolean> {
        setLoading(true)
        setState((prev) => ({
            ...prev,
            loading: true,
            state: "Checking API Health",
            savingUrl: true,
        }));
    
        try {
            const response = await axios.get(`${baseUrlForm.values.baseUrl}/api/v1/health`);
            if (response.status === 200) {
                setState((prev) => ({
                    ...prev,
                    loading: true,
                    state: "API Responded Successfully",
                    savingUrl: false,
                }));
    
                // Simulate a delay for saving the URL
                await delay(2000);
                await settingsRespository.setBaseURL(baseUrlForm.values.baseUrl);
    
                setState((prev) => ({
                    ...prev,
                    loading: true,
                    state: "Saving URL...",
                    savingUrl: true,
                }));
    
                // Simulate another delay for finalizing the process
                await delay(2000);
                setState((prev) => ({
                    ...prev,
                    loading: true,
                    state: "Your app is all set!",
                    savingUrl: false,
                }));
                await delay(2000);
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    state: "",
                    savingUrl: false,
                }));
                await delay(2000);
            }
           
            return true;
        } catch (error: any) {
            console.error("API Health Check Error:", error);
            setState((prev) => ({
                ...prev,
                loading: false,
                state: error?.message ?? "Something went wrong",
                savingUrl: false,
            }));
            baseUrlForm.setFieldError(
                "baseUrl",
                error?.message ?? (error.status === 404 ? "Invalid URL" : "Something went wrong")
            );
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        checkApiHealth,
        baseUrlForm,
        state
    }
}