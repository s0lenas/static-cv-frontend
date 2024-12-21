variable "domain_name" {
    type = string
    description = "Name of the domain"
}
variable "bucket_name" {
    type = string
    description = "Name of the bucket"
}
variable "region" {
    type = string
    default = "eu-west-1"
}
variable "bucket_list" {
    type = map(string)
}
variable "main_bucket_key" {
    type = string
    default = "bucket1"
}
variable "aws_test_account_id" {
    type = string
}
