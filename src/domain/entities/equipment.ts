export class Equipment {
  id?: string;
  name: string;
  type: string;
  serialNumber: string;
  status: "AVAILABLE" | "IN_USE" | "MAINTENANCE";
  location: string;
  assignedTo?: string | null; // id del usuario responsable

  constructor(
    name: string,
    type: string,
    serialNumber: string,
    status: "AVAILABLE" | "IN_USE" | "MAINTENANCE",
    location: string,
    assignedTo?: string | null,
  ) {
    this.name = name;
    this.type = type;
    this.serialNumber = serialNumber;
    this.status = status;
    this.location = location;
    this.assignedTo = assignedTo ?? null;
  }
}
