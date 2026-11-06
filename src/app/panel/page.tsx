'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  RollerCoaster,
  User,
  UserPlus,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type RoleType =
  | "Super Admin"
  | "Content Editor"
  | "SEO Manager"
  | "Support"
  | "Client";


const Panel = () => {
    // New user creation form state (Admin only)
    const [newUser, setNewUser] = useState<{
        name: string;
        email: string;
        phone: string;
        role: RoleType;
        clientCompany: string;
        password: string;
        status: "Active" | "Disabled";
    }>({
        name: "",
        email: "",
        phone: "",
        role: "Content Editor",
        clientCompany: "",
        password: "",
        status: "Active",
    });
    const [showNewUserPassword, setShowNewUserPassword] = useState(false);

    // User Management (Super Admin ONLY)
    async function handleCreateUser(e: React.FormEvent) {
        e.preventDefault();
        const {name, email, role, password} = newUser
        // await createUser(name, email, role, password)
        console.log('saved')
    }

    return (
        <main className="min-h-screen bg-[#080B11] text-white flex items-center justify-center p-6">
            <div className="w-full max-w-xl">
              {/* LEFT COLUMN: PROVISION USER ACCOUNT */}
              <div className="rbac-provision-card">
                <div className="card-laser-top" aria-hidden="true" />
                <div className="rbac-card-header">
                  <div className="rbac-squircle-icon">
                    <UserPlus size={20} />
                  </div>
                  <div className="rbac-header-copy">
                    <div className="rbac-title-row">
                      <h2>Provision User</h2>
                      <span className="rbac-restricted-badge">
                        <Lock size={10} /> RESTRICTED
                      </span>
                    </div>
                    <p className="rbac-card-subtitle">
                      Assign credentials and designated dashboard permissions.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleCreateUser} className="rbac-form">
                  {/* Full Name */}
                  <div className="rbac-input-group">
                    <label htmlFor="provision-name">Full Name</label>
                    <div className="rbac-field-wrapper">
                      <User
                        size={15}
                        className="rbac-field-icon"
                        aria-hidden="true"
                      />
                      <Input
                        id="provision-name"
                        placeholder="e.g. Sarah Jenkins"
                        value={newUser.name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, name: e.target.value })
                        }
                        required
                        className="rbac-styled-input"
                      />
                    </div>
                  </div>

                  {/* Account Email */}
                  <div className="rbac-input-group">
                    <label htmlFor="provision-email">Email Address</label>
                    <div className="rbac-field-wrapper">
                      <Mail
                        size={15}
                        className="rbac-field-icon"
                        aria-hidden="true"
                      />
                      <Input
                        id="provision-email"
                        type="email"
                        placeholder="user@ceasiun.com"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        required
                        className="rbac-styled-input"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="rbac-input-group">
                    <label htmlFor="provision-password">Password</label>
                    <div className="rbac-field-wrapper">
                      <KeyRound
                        size={15}
                        className="rbac-field-icon"
                        aria-hidden="true"
                      />
                      <Input
                        id="provision-password"
                        type={showNewUserPassword ? "text" : "password"}
                        placeholder="Assign password (min 6 chars)"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                        required
                        className="rbac-styled-input pr-10"
                      />
                      <button
                        type="button"
                        className="rbac-pw-toggle"
                        onClick={() => setShowNewUserPassword((prev) => !prev)}
                        aria-label={
                          showNewUserPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showNewUserPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Role Designation */}
                  <div className="rbac-input-group">
                    <label htmlFor="provision-role">
                      Role Designation & Workspace
                    </label>
                    <div className="rbac-select-wrapper">
                      <select
                        id="provision-role"
                        value={newUser.role}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            role: e.target.value as RoleType,
                          })
                        }
                        className="rbac-styled-select"
                      >
                        <option value="Super Admin">
                          Super Admin — Full System Control & User Management
                        </option>
                        <option value="Content Editor">
                          Content Editor — Editorial Pipeline & Publishing Hub
                        </option>
                        <option value="SEO Manager">
                          SEO Manager — Search Rankings & Performance Engine
                        </option>
                        <option value="Support">
                          Support Agent — Inquiries & Helpdesk Center
                        </option>
                        <option value="Client">
                          Client Account — Project Deliverables & Milestones
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Status Segmented Control */}
                  <div className="rbac-input-group">
                    <label>Account Status</label>
                    <div className="rbac-status-segmented">
                      <button
                        type="button"
                        className={`rbac-segment-btn ${
                          newUser.status === "Active" ? "is-active" : ""
                        }`}
                        onClick={() =>
                          setNewUser({ ...newUser, status: "Active" })
                        }
                      >
                        <span className="segment-dot green" /> Active
                      </button>
                      <button
                        type="button"
                        className={`rbac-segment-btn ${
                          newUser.status === "Disabled" ? "is-active" : ""
                        }`}
                        onClick={() =>
                          setNewUser({ ...newUser, status: "Disabled" })
                        }
                      >
                        <span className="segment-dot red" /> Disabled
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    size="lg"
                    type="submit"
                    className="w-full rbac-submit-btn"
                  >
                    <UserPlus size={16} /> Create New User 
                  </Button>
                </form>
              </div>
            </div>
        </main>
    );
};

export default Panel;
