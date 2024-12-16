terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "4.2.0"
        }
    }
}

resource "aws_s3_bucket" "bucket" {
    for_each = var.bucket_list
    bucket = each.key
}

data "aws_s3_bucket" "selected-bucket" {
    bucket = aws_s3_bucket.bucket-1.bucket
}

resource "aws_s3_bucket_acl" "bucket-acl" {
    for_each = aws_s3_bucket.bucket

    bucket = each.value.id
    acl    = "public-read"
    depends_on = [aws_s3_bucket_ownership_controls.aws_s3_bucket_acl_ownership]
}