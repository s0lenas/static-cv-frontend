terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "4.2.0"
        }
    }
}


provider "aws" {

    assume_role_with_web_identity {

        role_arn = "arn:aws:iam::${var.aws_test_account_id}:role/OpenID-Role-xlyalbnhz58Y"
        session_name = "github_action_session"
        web_identity_token_file = "/tmp/web_identity_token_file"

    }

}

resource "aws_s3_bucket" "bucket" {
    for_each = var.bucket_list
    bucket = each.value
}

resource "aws_s3_bucket_acl" "bucket-acl" {
    for_each = var.bucket_list

    bucket = aws_s3_bucket.bucket[each.key].id
    acl    = "public-read"
}

resource "aws_s3_bucket_ownership_controls" "aws_s3_bucket_acl_ownership" {
    for_each = var.bucket_list

    bucket = aws_s3_bucket.bucket[each.key].id
    rule {
        object_ownership = "BucketOwnerPreferred"
    }
}

resource "aws_s3_bucket_public_access_block" "block" {
    for_each = var.bucket_list

    bucket = aws_s3_bucket.bucket[each.key].id

    block_public_acls       = false
    block_public_policy     = false
    ignore_public_acls      = false
    restrict_public_buckets = false
}

data "aws_s3_bucket" "main-bucket" {
    bucket = lookup(var.bucket_list, var.main_bucket_key)
}

resource "aws_s3_bucket_policy" "bucket_policy" {
    bucket = data.aws_s3_bucket.main-bucket.bucket
    policy = data.aws_iam_policy_document.iam-policy-1.json
}

data "aws_iam_policy_document" "iam-policy-1" {
    statement {
        sid = "AllowPublicRead"
        effect = "Allow"
    resources = [
        "arn:aws:s3:::${var.bucket_name}",
        "arn:aws:s3:::${var.bucket_name}/*",
    ]
    actions = ["S3:GetObject"]
    principals {
        type = "*"
        identifiers = ["*"]
    }
    }
}

resource "aws_s3_bucket_website_configuration" "website-config" {
    bucket = data.aws_s3_bucket.main-bucket.bucket
    index_document {
        suffix = "index.html"
    }
}

