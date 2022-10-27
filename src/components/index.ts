import dynamic from "next/dynamic";

export const Border = dynamic(import("./Border"));
export const Button = dynamic(import("./Button"));
export const Col = dynamic(import("./Col"));
export const Container = dynamic(import("./Container"));
export const Dropdown = dynamic(import("./Dropdown"));
export const Grid = dynamic(import("./Grid"));
export const Image = dynamic(import("./Image"));
export const LaunchApp = dynamic(import("./Title/LaunchApp"));
export const Modal = dynamic(import("./Modal"));
export const Page = dynamic(import("./Page"));
export const Row = dynamic(import("./Row"));
export const Seo = dynamic(import("./Seo"));
export { default as Loading } from "./Loading";
export { default as Notification } from "./Notification";
