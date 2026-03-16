import { useContext } from "react";
import Resource from "./Resource";
import "./ResourcesList.css";
import { GeneralContext } from "../../../hooks/GeneralContext";

export default function ResourcesList() {
  const { resources } = useContext(GeneralContext);
  return (
    <div className="resources-list">
      {
        resources.map((resource)=>(
            <Resource resource={resource} />
        ))
      }
    </div>
  );
}
