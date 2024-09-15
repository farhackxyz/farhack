"use client"

import * as React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { type User } from "../lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import WarpcastIcon from "./icons/warpcast-icon"

interface AdminTableProps {
  createUser: (user: Omit<User, "id" | "created_at">) => Promise<User>
  updateUser: (user: User) => Promise<void>
  removeUser: (userId: number) => Promise<void>
  users: User[]
}

export default function AdminTable({ createUser, updateUser, removeUser, users }: AdminTableProps) {
  const [editUser, setEditUser] = useState<User | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  const [name, setName] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [adminHackathons, setAdminHackathons] = useState<string>("")
  const [userList, setUserList] = useState<User[]>(users)

  const handleAddUser = () => {
    setImage("")
    setName("")
    setAdminHackathons("")
    setIsAddModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditUser(user)
    setName(user.name)
    setImage(user.image)
    setAdminHackathons(user.admin_hackathons)
    setIsEditModalOpen(true)
  }

  const handleRemoveUser = (user: User) => {
    setEditUser(user)
    setIsRemoveModalOpen(true)
  }

  const handleSubmitNewUser = async () => {
    if (name && validateUrl(image) && adminHackathons) {
      const newUser = { name, image, is_admin: true, admin_hackathons: adminHackathons }
      const createdUser = await createUser(newUser)
      setUserList([...userList, createdUser])
      setIsAddModalOpen(false)
    }
  }

  const handleSubmitEditUser = async () => {
    if (editUser && name && validateUrl(image) && adminHackathons) {
      const updatedUser = { ...editUser, name, image, admin_hackathons: adminHackathons }
      await updateUser(updatedUser)
      setUserList(userList.map(user => user.id === updatedUser.id ? updatedUser : user))
      setIsEditModalOpen(false)
    }
  }

  const handleConfirmRemoveUser = async () => {
    if (editUser) {
      await removeUser(Number(editUser.id))
      setUserList(userList.filter(user => user.id !== editUser.id))
      setIsRemoveModalOpen(false)
    }
  }

  const validateUrl = (url: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
      "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" +
      "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" +
      "(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    )
    return !!urlPattern.test(url)
  }

  return (
    <Card>
        <CardHeader className="px-7">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-1 items-start">
                    <CardTitle>Admins</CardTitle>
                    <CardDescription>List of all admins</CardDescription>
                </div>
                <Button className="mb-3" onClick={handleAddUser}>Add Admin</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>FID</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Profile</TableHead>
                        <TableHead>Hackathon Access</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {userList.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="flex flex-row gap-2 items-center mt-1">
                        <Image src={user.image} alt={user.name} width={22} height={22} className="rounded-full" />
                        {user.name}
                    </TableCell>
                    <TableCell>
                        <a href={`https://warpcast.com/${user.name}`} target="_blank">
                            <WarpcastIcon />
                        </a>
                    </TableCell>
                    <TableCell>{user.admin_hackathons === 'all' ? "All" : user.admin_hackathons}</TableCell>
                    <TableCell>
                        <Button className="mr-2" onClick={() => handleEditUser(user)}>Edit</Button>
                        <Button onClick={() => handleRemoveUser(user)}>Remove</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Admin</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className={image && !validateUrl(image) ? "border-red-500" : ""}
                        />
                        {image && !validateUrl(image) && <p className="text-red-500">Please enter a valid URL.</p>}
                        <Label htmlFor="adminHackathons">Admin Hackathons</Label>
                        <Input
                        id="adminHackathons"
                        value={adminHackathons}
                        onChange={(e) => setAdminHackathons(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmitNewUser}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Admin</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className={image && !validateUrl(image) ? "border-red-500" : ""}
                        />
                        {image && !validateUrl(image) && <p className="text-red-500">Please enter a valid URL.</p>}
                        <Label htmlFor="adminHackathons">Admin Hackathons</Label>
                        <Input
                        id="adminHackathons"
                        value={adminHackathons}
                        onChange={(e) => setAdminHackathons(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmitEditUser}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isRemoveModalOpen} onOpenChange={setIsRemoveModalOpen}>
                <DialogTrigger />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Admin</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleConfirmRemoveUser}>Confirm Remove</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardContent>
    </Card>
  )
}