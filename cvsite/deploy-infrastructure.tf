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
    bucket = each.value
}

resource "aws_s3_bucket" "main-bucket" {
    bucket = "${var.bucket_name}"
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

resource "aws_s3_bucket_policy" "bucket_policy" {
    bucket = data.aws_s3_bucket.main_bucket.id
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
    bucket = aws_s3_bucket.main_bucket.id
    index_document {
        suffix = "index.html"
    }
}

